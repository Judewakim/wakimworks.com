# AWS S3 Security Tools — archived from wakimworks.com

**Status:** removed from the public site. Nothing here is deployed — `docs/` is
excluded from the S3 sync in `.github/workflows/deploy.yml`.

**Why this file exists:** these two tools were presented as products on the
website, but each is really a script you paste into AWS CloudShell. They were
pulled from the site so the product cards don't oversell. Everything needed to
revive them — bucket paths, exact commands, parameters, copy, and the original
implementation — is preserved below so they can be moved into their own GitHub
repo later.

Archived 2026-09-01 from commit `3967ed5` (`index.html`).

---

## Where the artifacts actually live

Both tools are served out of a **public S3 bucket**:

```
s3://wakimworks-public-templates/
└── s3-scanner/
    ├── hipaa-deployment.py                      # HIPAA deployer script
    └── WakimWorks-S3Scanner-Launcher.yaml       # CloudFormation launcher template
```

Two different URL forms were used for the same bucket — both work, keep both in
mind when searching:

- `https://wakimworks-public-templates.s3.amazonaws.com/s3-scanner/hipaa-deployment.py`
- `https://s3.amazonaws.com/wakimworks-public-templates/s3-scanner/WakimWorks-S3Scanner-Launcher.yaml`

> **This bucket is the single point of failure.** The site only ever held the
> commands; the actual code lives in S3. Before decommissioning or cleaning that
> bucket, pull both objects down and commit them to a real repo.

Both tools were launched from AWS CloudShell:
`https://console.aws.amazon.com/cloudshell/home?region=us-east-1`

---

## Tool 1 — Security Scanner for AWS S3

**Site copy:**
> Scan all buckets in your AWS S3 account(s), identify misconfigurations, and
> auto-remediate issues to keep your data secure. Always evolving with new features.

**Logo:** `s3scanner-logo.png` (moved to `unused/`)

**AWS Marketplace listing** — this was present in the markup but commented out,
so it was never live on the site:
`https://aws.amazon.com/marketplace/pp/prodview-opi7622wlb2wk`

**Deployment command**, exactly as it was copied to the clipboard:

```bash
# PARAMETERS: your email, buckets excluded from scan, invocation mode
      aws cloudformation create-stack         --stack-name WakimWorksS3ScannerLauncher         --template-url https://s3.amazonaws.com/wakimworks-public-templates/s3-scanner/WakimWorks-S3Scanner-Launcher.yaml         --capabilities CAPABILITY_NAMED_IAM         --region us-east-1         --parameters           ParameterKey=UserEmail,ParameterValue=user@example.com           ParameterKey=InvocationMode,ParameterValue=scanning_only           ParameterKey=ExcludeBuckets,ParameterValue=""
```

Note the odd run-together spacing: in the original source this was a JS template
literal whose lines ended in `\`, which is a **line continuation** — it strips
the newline but keeps the next line's indentation. The result was one long
single-line command (565 chars). It pastes and runs correctly; it just doesn't
look like it was intended to.

Here is the same command written the way it was clearly meant to look:

```bash
# PARAMETERS: your email, buckets excluded from scan, invocation mode
aws cloudformation create-stack \
  --stack-name WakimWorksS3ScannerLauncher \
  --template-url https://s3.amazonaws.com/wakimworks-public-templates/s3-scanner/WakimWorks-S3Scanner-Launcher.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1 \
  --parameters \
    ParameterKey=UserEmail,ParameterValue=user@example.com \
    ParameterKey=InvocationMode,ParameterValue=scanning_only \
    ParameterKey=ExcludeBuckets,ParameterValue=""
```

**Stack parameters:**

| Parameter | Example value | Notes |
|---|---|---|
| `UserEmail` | `user@example.com` | where scan results are sent |
| `InvocationMode` | `scanning_only` | the other mode(s) live in the YAML template — check it for the full list, likely a remediation mode |
| `ExcludeBuckets` | `""` | buckets to skip during the scan |

Stack name: `WakimWorksS3ScannerLauncher` · Region: `us-east-1` ·
Requires `CAPABILITY_NAMED_IAM` (the template creates named IAM roles).

---

## Tool 2 — HIPAA Compliance System for AWS S3

**Site copy:**
> Scan all buckets in your AWS S3 account(s) against HIPAA compliance controls,
> automatically remediate, audit logging, generate reports, all from one intuitive
> dashboard to keep your PHI secure. Always evolving with new features.

**Logo:** `hipaa-logo.png` (moved to `unused/`)

**Deployment command:**

```bash
curl -O https://wakimworks-public-templates.s3.amazonaws.com/s3-scanner/hipaa-deployment.py && python3 hipaa-deployment.py
```

Downloads the deployer and runs it with the system Python 3. Unlike the scanner,
this one is a Python script rather than a CloudFormation stack, so whatever it
provisions is defined inside `hipaa-deployment.py` itself.

---

## Original site implementation

The two "Copy Deployment Command" buttons called these functions, which lived in
an inline `<script>` in the middle of the services section:

```js
function copyHIPAACommand() {
  const command = 'curl -O https://wakimworks-public-templates.s3.amazonaws.com/s3-scanner/hipaa-deployment.py && python3 hipaa-deployment.py';
  navigator.clipboard.writeText(command);
  document.getElementById('customModal').classList.remove('hidden');
}
function copySecurityScanCommand() {
  const command = `# PARAMETERS: your email, buckets excluded from scan, invocation mode
      aws cloudformation create-stack \
        --stack-name WakimWorksS3ScannerLauncher \
        --template-url https://s3.amazonaws.com/wakimworks-public-templates/s3-scanner/WakimWorks-S3Scanner-Launcher.yaml \
        --capabilities CAPABILITY_NAMED_IAM \
        --region us-east-1 \
        --parameters \
          ParameterKey=UserEmail,ParameterValue=user@example.com \
          ParameterKey=InvocationMode,ParameterValue=scanning_only \
          ParameterKey=ExcludeBuckets,ParameterValue=""
      `;
  navigator.clipboard.writeText(command);
  document.getElementById('customModal').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('customModal').classList.add('hidden');
}
```

Known bug in the original, worth not reintroducing: `writeText()` had no
`.catch()`, so the "Command copied!" confirmation appeared even when the copy
was rejected (insecure origin, denied permission).

---

## If you revive these

1. **Get the code out of S3 first** — `aws s3 sync s3://wakimworks-public-templates/s3-scanner/ ./s3-scanner/`. The website never contained the implementation.
2. Give each tool its own GitHub repo with a real README, the CloudFormation template, and the Python deployer in version control.
3. A one-line CloudShell paste is a fine *distribution* method, but it isn't a product surface. If these go back on a website, link to the repos and let the README carry the instructions.
