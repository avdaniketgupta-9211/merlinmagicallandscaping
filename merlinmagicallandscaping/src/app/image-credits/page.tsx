import { ContentPage } from "@/components/layout/content-page";
import { film, photography } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Media Credits", "Photographers and filmmakers behind the temporary visual references on the Merlin website.", "/image-credits");

export default function CreditsPage() {
  const creditedPhotos = Object.values(photography).filter(({ credit, reference }) => reference && Boolean(credit));
  return (
    <ContentPage label="Source notes" title="Media Credits">
      <p>The reference photographs and garden film are licensed through the <a href="https://www.pexels.com/license/">Pexels License</a>. They are not presented as Merlin projects. Original creator pages are linked below.</p>
      <h2>Photography</h2>
      <ul>{creditedPhotos.map(({ src, alt, credit }) => credit && <li key={src}><a href={credit.url}>{alt}</a> by {credit.creator}</li>)}</ul>
      {film.credits.length > 0 && <><h2>Garden film</h2><ul>{film.credits.map(({ title, creator, url }) => <li key={url}><a href={url}>{title}</a> by {creator}</li>)}</ul></>}
    </ContentPage>
  );
}
