-- =====================================================
-- Helper function: update updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =====================================================
-- Audit log table
-- =====================================================
DROP TABLE IF EXISTS audit_log CASCADE;
CREATE TABLE IF NOT EXISTS audit_log
(
    audit_id     BIGSERIAL PRIMARY KEY,
    table_name   TEXT                      NOT NULL,
    operation    TEXT                      NOT NULL,
    row_id       UUID                      NOT NULL,
    changed_data JSONB,
    created_at   TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- =====================================================
-- Generic audit log trigger function
-- =====================================================
CREATE OR REPLACE FUNCTION log_audit()
    RETURNS TRIGGER AS
$$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO audit_log (table_name, operation, row_id, changed_data)
        VALUES (TG_TABLE_NAME, TG_OP, OLD.id, row_to_json(OLD));
        RETURN OLD;
    ELSE
        INSERT INTO audit_log (table_name, operation, row_id, changed_data)
        VALUES (TG_TABLE_NAME, TG_OP, NEW.id, row_to_json(NEW));
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Users (application-specific profile linked to auth.users)
-- =====================================================
DROP TABLE IF EXISTS app_users CASCADE;
CREATE TABLE IF NOT EXISTS app_users
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID                           NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    display_name TEXT,
    created_at   TIMESTAMPTZ      DEFAULT now() NOT NULL,
    updated_at   TIMESTAMPTZ      DEFAULT now() NOT NULL,
    is_deleted   BOOLEAN          DEFAULT FALSE NOT NULL,
    UNIQUE (user_id)
);
CREATE INDEX idx_app_users_user_id ON app_users (user_id);

-- =====================================================
-- Subscriptions
-- =====================================================
DROP TABLE IF EXISTS subscriptions CASCADE;
CREATE TABLE IF NOT EXISTS subscriptions
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID                           NOT NULL REFERENCES app_users (id) ON DELETE CASCADE,
    plan_type  TEXT                           NOT NULL, -- e.g., free, pro, premium
    start_date TIMESTAMPTZ                    NOT NULL,
    end_date   TIMESTAMPTZ,
    status     TEXT                           NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ      DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ      DEFAULT now() NOT NULL,
    is_deleted BOOLEAN          DEFAULT FALSE NOT NULL
);
CREATE INDEX idx_subscriptions_user_id ON subscriptions (user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions (status);

-- =====================================================
-- Workouts
-- =====================================================
DROP TABLE IF EXISTS workouts CASCADE;
CREATE TABLE IF NOT EXISTS workouts
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID                           NOT NULL REFERENCES app_users (id) ON DELETE CASCADE,
    workout_date DATE                           NOT NULL,
    notes        TEXT,
    created_at   TIMESTAMPTZ      DEFAULT now() NOT NULL,
    updated_at   TIMESTAMPTZ      DEFAULT now() NOT NULL,
    is_deleted   BOOLEAN          DEFAULT FALSE NOT NULL,
    UNIQUE (user_id, workout_date)
);
CREATE INDEX idx_workouts_user_id ON workouts (user_id);
CREATE INDEX idx_workouts_date ON workouts (workout_date);

-- =====================================================
-- Exercises
-- =====================================================
DROP TABLE IF EXISTS exercises CASCADE;
CREATE TABLE IF NOT EXISTS exercises
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workout_id UUID                           NOT NULL REFERENCES workouts (id) ON DELETE CASCADE,
    name       TEXT                           NOT NULL,
    sequence   INT                            NOT NULL, -- order within workout
    created_at TIMESTAMPTZ      DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ      DEFAULT now() NOT NULL,
    is_deleted BOOLEAN          DEFAULT FALSE NOT NULL
);
CREATE INDEX idx_exercises_workout_id ON exercises (workout_id);

-- =====================================================
-- Sets
-- =====================================================
DROP TABLE IF EXISTS exercise_sets CASCADE;
CREATE TABLE IF NOT EXISTS exercise_sets
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exercise_id UUID                           NOT NULL REFERENCES exercises (id) ON DELETE CASCADE,
    set_number  INT                            NOT NULL,
    target_reps INT,
    actual_reps INT,
    target_rpe  NUMERIC(3, 1),
    actual_rpe  NUMERIC(3, 1),
    is_warmup   BOOLEAN          DEFAULT FALSE NOT NULL,
    created_at  TIMESTAMPTZ      DEFAULT now() NOT NULL,
    updated_at  TIMESTAMPTZ      DEFAULT now() NOT NULL,
    is_deleted  BOOLEAN          DEFAULT FALSE NOT NULL,
    UNIQUE (exercise_id, set_number)
);
CREATE INDEX idx_exercise_sets_exercise_id ON exercise_sets (exercise_id);

-- =====================================================
-- Transactions (Finance)
-- =====================================================
DROP TABLE IF EXISTS transactions CASCADE;
CREATE TABLE IF NOT EXISTS transactions
(
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID                           NOT NULL REFERENCES app_users (id) ON DELETE CASCADE,
    subscription_id  UUID                           REFERENCES subscriptions (id) ON DELETE SET NULL,
    amount           NUMERIC(10, 2)                 NOT NULL,
    currency         TEXT                           NOT NULL DEFAULT 'EGP',
    status           TEXT                           NOT NULL, -- e.g., pending, completed, failed
    transaction_date TIMESTAMPTZ      DEFAULT now() NOT NULL,
    reference        TEXT,
    created_at       TIMESTAMPTZ      DEFAULT now() NOT NULL,
    updated_at       TIMESTAMPTZ      DEFAULT now() NOT NULL,
    is_deleted       BOOLEAN          DEFAULT FALSE NOT NULL
);
CREATE INDEX idx_transactions_user_id ON transactions (user_id);
CREATE INDEX idx_transactions_date ON transactions (transaction_date);

-- =====================================================
-- Attach triggers for updated_at & audit logging
-- =====================================================
-- app_users
CREATE TRIGGER trg_app_users_updated_at
    BEFORE UPDATE
    ON app_users
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_app_users_audit
    AFTER INSERT OR UPDATE OR DELETE
    ON app_users
    FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- subscriptions
CREATE TRIGGER trg_subscriptions_updated_at
    BEFORE UPDATE
    ON subscriptions
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_subscriptions_audit
    AFTER INSERT OR UPDATE OR DELETE
    ON subscriptions
    FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- workouts
CREATE TRIGGER trg_workouts_updated_at
    BEFORE UPDATE
    ON workouts
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_workouts_audit
    AFTER INSERT OR UPDATE OR DELETE
    ON workouts
    FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- exercises
CREATE TRIGGER trg_exercises_updated_at
    BEFORE UPDATE
    ON exercises
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_exercises_audit
    AFTER INSERT OR UPDATE OR DELETE
    ON exercises
    FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- exercise_sets
CREATE TRIGGER trg_exercise_sets_updated_at
    BEFORE UPDATE
    ON exercise_sets
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_exercise_sets_audit
    AFTER INSERT OR UPDATE OR DELETE
    ON exercise_sets
    FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- transactions
CREATE TRIGGER trg_transactions_updated_at
    BEFORE UPDATE
    ON transactions
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_transactions_audit
    AFTER INSERT OR UPDATE OR DELETE
    ON transactions
    FOR EACH ROW
EXECUTE FUNCTION log_audit();
