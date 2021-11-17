// This profile enables lint rules intended for a general Node.js project, typically a web service.
// It enables security rules that assume the service could receive malicious inputs from an
// untrusted user.  If that is not the case, consider using the "node-trusted-tool" profile instead.

const { buildRules } = require("./_common");

const rules = buildRules("node");
module.exports = rules;
