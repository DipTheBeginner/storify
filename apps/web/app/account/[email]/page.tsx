import AccountPageClient from "./AccountPageClient"; // ✅ no dynamic import

interface Props {
  params: Promise<{
    email: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { email } = await params; // ✅ Await params before accessing properties
  const decodedEmail = decodeURIComponent(email);
  return <AccountPageClient email={decodedEmail} />;
}