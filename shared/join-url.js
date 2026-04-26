// Returns the URL a participant should scan to join the current session.
// Uses window.location.origin so it works automatically in any deployment
// (localhost during dev, github.io, tools.unruledplay.dk, etc.)
// Preserves all existing query parameters except `facilitator`, which must
// be stripped so participants don't accidentally load the facilitator view.

function buildJoinUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete('facilitator');
  return url.toString();
}
