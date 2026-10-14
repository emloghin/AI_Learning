$errs = $null
$null = [System.Management.Automation.Language.Parser]::ParseFile('C:\GIT\GIT-Personal\AI_Learning\GH-600\gh-600-answers.ps1', [ref]$null, [ref]$errs)
if ($errs.Count -eq 0) { Write-Output 'PARSE OK' } else { $errs | ForEach-Object { Write-Output ("{0}: {1}" -f $_.Extent.StartLineNumber, $_.Message) } }
