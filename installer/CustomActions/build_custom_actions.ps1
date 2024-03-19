param (
    [Parameter(HelpMessage = "Build type - Release, Release-Obfuscate, Debug")]
    [ValidateSet('Release', 'Debug')]
    [string]$build_type='Release'
)


$ErrorActionPreference = "Stop" # this works only if commandlets return error, for EXEs have to check manually

$calling_dir = $pwd
$msbuild = &"${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -products * -requires Microsoft.Component.MSBuild -find MSBuild\Current\Bin\MSBuild.exe

function exit_if_error_and_return_to_calling_dir {
    param($exitcode, $message)

    if ($exitcode) {
        $Host.UI.WriteErrorLine("ERROR: ")
        $Host.UI.WriteErrorLine("ERROR: $message")
        $Host.UI.WriteErrorLine("ERROR: Exit code: $exitcode")

        cd $calling_dir
        exit -1
    }
}

function write_header {
    param($text)

    Write-Output ""
    Write-Output ""
    Write-Output "+--------------------------------------------"
    Write-Output "| $text"
    Write-Output "+--------------------------------------------"
    Write-Output ""
}


cd "$PSScriptRoot"
write_header "Restoring nuget packages for CustomActions.sln"
& "$msbuild" CustomActions.sln /t:restore /p:Configuration=$build_type /p:platform=x64
exit_if_error_and_return_to_calling_dir $LASTEXITCODE "Restoring nuget packages for CustomActions.sln failed!"

write_header "Building CustomActions.sln..."
& "$msbuild" CustomActions.sln /m /p:Conditionals=NO_LOG_ENCRYPTION /p:Configuration=$build_type /p:WDMTheme=$param_wdm_theme /p:platform=x64 /Consoleloggerparameters:verbosity=minimal /Fileloggerparameters:verbosity=quiet -nodeReuse:false
exit_if_error_and_return_to_calling_dir $LASTEXITCODE "Build of CustomActions.sln failed!"

cd "$calling_dir"
