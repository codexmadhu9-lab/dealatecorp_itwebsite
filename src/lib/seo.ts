const SITE_ORIGIN = "https://www.dealatecorp.in";

export function canonicalLink(path: string) {
  return {
    rel: "canonical",
    href: new URL(path, SITE_ORIGIN).toString(),
  };
}
