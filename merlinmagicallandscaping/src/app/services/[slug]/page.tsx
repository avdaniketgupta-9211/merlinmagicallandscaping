import { notFound } from "next/navigation";
import { ContentPage } from "@/components/layout/content-page";
import { Photo, TextLink } from "@/components/ui/editorial";
import { services } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return pageMetadata(service.title, service.summary, `/services/${slug}`, service.image.src);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <ContentPage label="Landscaping services" title={service.title}>
      <p>{service.summary}</p>
      <p>{service.detail}</p>
      <TextLink href={`/?service=${encodeURIComponent(service.slug)}#contact`}>Enquire about {service.title}</TextLink>
      <figure className="service-detail-photo">
        <Photo image={service.image} sizes="(max-width: 830px) 88vw, 740px" />
        {service.image.reference && <figcaption className="figure-caption">Reference photography{service.image.credit && <> · {service.image.credit.creator}</>}</figcaption>}
      </figure>
    </ContentPage>
  );
}
