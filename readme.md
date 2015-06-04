google-drive-downloader
=======================

Lists and downloads files from google drive. It can easily filter files on date
and find a specific sub-folder to iterate through.

Auth setup
----------

You can find info on creating credentials at
[the github page for googleauth](https://github.com/maxogden/googleauth), the
module handling the auth-stuff.


Usage
-----

	export GOOGLEAUTH_CLIENT=<api key>.apps.googleusercontent.com
	export GOOGLEAUTH_SECRET=<secret key>

	google-drive-downloader <command>

If the program is run without a command or with an invalid command, it will show
a help-message. This can also be shown by adding `--help`, which will also show
the available options for individual commands (eg.
`google-drive-downloader list-children --help`)


Available commands
------------------

### list-children

	... list-children <path> [options...]

The `path` parameter is the path for which to list children. To list root, run
`google-drive-downloader list-children /`.

The path-matching is case-sensitive.

#### Available options

- `--modified-after` / `-m`: json date, it will only return matches modified after this date.
