import Link from "next/link";
import { ContentPage } from "@/components/layout/content-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacy Policy", "How Merlin Magicallandscapi handles information you submit through the enquiry or feedback form.", "/privacy");

export default function PrivacyPage() {
  return (
    <ContentPage label="Website information" title="Privacy Policy">
      <p>This policy describes how this website handles the information you share with Merlin Magicallandscapi.</p>
      <h2>What the form collects</h2>
      <p>The form collects your name, email, any phone number you provide and your preferred way to be contacted. A project enquiry also includes the town or postcode, service interest and description you submit. Feedback includes the message you choose to share. Please don’t include sensitive personal, health or payment information.</p>
      <h2>Why this information is used</h2>
      <p>Submissions are stored in a private database so that Merlin can consider your request and respond. Feedback sent through the form is not automatically published or used as a testimonial. The form does not sign you up for marketing.</p>
      <h2>Hosting and abuse prevention</h2>
      <p>Hosting and database providers process information as necessary to run the website. The form uses short-lived counters based on protected hashes to limit repeated or abusive submissions. This site doesn’t set advertising cookies or run third-party tracking scripts.</p>
      <h2>Retention and your choices</h2>
      <p>Enquiries should be kept only for as long as needed to respond or to meet applicable obligations. If you have a question or want to ask about accessing, correcting or deleting an enquiry, use the <Link href="/?intent=feedback#contact">contact form</Link>. Include the reference you received if you still have it.</p>
    </ContentPage>
  );
}
