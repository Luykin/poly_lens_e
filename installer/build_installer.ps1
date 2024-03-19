param(
    [Parameter(HelpMessage = "Advanced installer version used for build")]
    [string]$ai_version="20.9.1",

    [Parameter(HelpMessage = "Lens Desktop version")]
    [string]$lens_version="99.0.0.0",

    [Parameter(HelpMessage = "Call Control App version")]
    [string]$call_control_version="0.0.0.0"
)

$advanced_installer = "C:\\Program Files (x86)\\Caphyon\\Advanced Installer $ai_version\\bin\\x86\\AdvancedInstaller.com"
Write-Output "Using advanced installer version: $advanced_installer"

$calling_dir = "$pwd"
cd "$PSScriptRoot"
$tmp_aip_file = "LensDesktop_tmp.aip"

Write-Output "Build CustomActions..."
./CustomActions/build_custom_actions.ps1
if ($LASTEXITCODE) { exit -1 }

Write-Output "Creating temporary file $tmp_aip_file"
cp LensDesktop.aip $tmp_aip_file

Write-Output "Adding locales directory to files and folders"
& "$advanced_installer" /edit  $tmp_aip_file /AddFolder APPDIR "$PSScriptRoot\\..\\out\\Lens Desktop-win32-x64\\locales"
if ($LASTEXITCODE) { exit -1 }

Write-Output "Adding resources directory to files and folders"
& "$advanced_installer" /edit  $tmp_aip_file /AddFolder APPDIR "$PSScriptRoot\\..\\out\\Lens Desktop-win32-x64\\resources"
if ($LASTEXITCODE) { exit -1 }

Write-Output "Adding resources directory to files and folders"
& "$advanced_installer" /edit  $tmp_aip_file /SetProperty CALLCONTROLVERSION=$call_control_version
if ($LASTEXITCODE) { exit -1 }

Write-Output "Setting Lens Desktop installer version to $lens_version"
& "$advanced_installer" /edit  $tmp_aip_file /SetVersion $lens_version
if ($LASTEXITCODE) { exit -1 }

Write-Output "Generating new product code"
& "$advanced_installer" /edit $tmp_aip_file /SetProductCode -langid 1033

Write-Output "Rebuilding Lens Desktop installer"
& "$advanced_installer" /Rebuild  $tmp_aip_file
if ($LASTEXITCODE) { exit -1 }

rm $tmp_aip_file
cd "$calling_dir"
