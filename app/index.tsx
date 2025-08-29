import { Redirect } from "expo-router";

// With the auth guard in _layout.tsx, this page just redirects to a protected route
// The auth guard will handle redirecting to auth pages if the user is not authenticated
const Page = () => {
	return <Redirect href="/(tabs)/dashboard" />;
};

export default Page;
