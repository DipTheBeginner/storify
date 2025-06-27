import dynamic from "next/dynamic";

// Import the client component dynamically
const AccountPageClient = dynamic(() => import("./AccountPageClient"), {
  ssr: false,
});

interface Props {
  params: { email: string };
}

export default function Page({ params }: Props) {
  return <AccountPageClient email={decodeURIComponent(params.email)} />;
}
