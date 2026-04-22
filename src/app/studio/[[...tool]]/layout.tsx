export const metadata = {
  title: 'Auxon Growth — CMS Studio',
  description: 'Content management for Auxon Growth',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div id="sanity-studio">{children}</div>
}
