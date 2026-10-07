import { Redirect } from 'expo-router';

/** The app opens on the showcase currently being built or recorded. */
export default function Index() {
  return <Redirect href="/fashora" />;
}
