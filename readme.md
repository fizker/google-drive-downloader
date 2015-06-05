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
`google-drive-downloader list-files --help`)


Available commands
------------------

### ls

	... ls <path> [options...]

The `path` parameter is the path for which to list files. To list the files in
the root folder, run `google-drive-downloader ls /`.

The path-matching is case-sensitive.

#### Available options

- `--modified-after` / `-m`: json date, it will only return files modified
    after this date.

### get-all

	... get-all <path> [options...]

The `path` parameter is the path for which to download files. To download the
files in the root folder, run `google-drive-downloader ls /`.

#### Available options

- `--modified-after` / `-m`: json date, it will only return files modified
    after this date.
- `--output-dir` / `-o`: The folder to download to. The default is the current
    folder.
