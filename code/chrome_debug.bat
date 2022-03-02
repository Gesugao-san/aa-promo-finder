
@REM chrome_debug.bat
@REM CD /D "C:\Program Files\Google\Chrome\Application"
START "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=21222
@REM PAUSE
EXIT /B %ERRORLEVEL%
