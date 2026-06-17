/**
 * Route transitions are handled by <RouteCurtain /> (mounted once in the root
 * layout as a fixed overlay), not here — wrapping children in a template that
 * re-mounts on every navigation caused React `removeChild` crashes. This
 * template now just passes children through.
 */
export default function Template({ children }) {
  return children
}
