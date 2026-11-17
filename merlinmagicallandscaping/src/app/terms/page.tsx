import Link from "next/link";
import { ContentPage } from "@/components/layout/content-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Terms & Conditions", "The terms for using the Merlin Magicallandscapi website and requesting a landscaping quote.", "/terms");

export default function TermsPage() {
  return (
    <ContentPage label="Website information" title="Terms & Conditions">
      <p>Merlin Magicallandscapi provides this website to share information about landscaping and outdoor spaces and to receive enquiries.</p>
      <h2>Enquiries and quotes</h2>
      <p>Submitting the form does not book work, create a contract or confirm service availability. Any scope, price, schedule and applicable project terms will be agreed separately before work starts.</p>
      <h2>Photographs and references</h2>
      <p>Images labelled as references are provided for inspiration and do not depict completed Merlin projects. Licensed photographs and films belong to their respective rights holders. See <Link href="/image-credits">Media Credits</Link> for source details.</p>
      <h2>Using the website</h2>
      <p>Please supply accurate contact details and don’t submit spam or material you don’t have permission to share. If you have a question about the website, <Link href="/#contact">get in touch</Link>.</p>
    </ContentPage>
  );
}
