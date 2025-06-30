import AccountPageClient from "./AccountPageClient"; // ✅ no dynamic import

interface Props {
  params: {
    email: string;
  };
}

export default function Page({ params }: Props) {
  const decodedEmail = decodeURIComponent(params.email);
  return <AccountPageClient email={decodedEmail} />;
}
