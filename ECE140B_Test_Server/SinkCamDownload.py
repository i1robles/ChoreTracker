from apiclient.discovery import build
from apiclient import errors
from oauth2client.service_account import ServiceAccountCredentials
from httplib2 import Http

# define a function to retrieve all files
def retrieve_all_files(api_service):
    results = []
    page_token = None

    while True:
        try:
            param = {}

            if page_token:
                param['pageToken'] = page_token

            files = api_service.files().list(**param).execute()
            # append the files from the current result page to our list
            results.extend(files.get('files'))
            # Google Drive API shows our files in multiple pages when the number of files exceed 100
            page_token = files.get('nextPageToken')

            if not page_token:
                break

        except errors.HttpError as error:
            print(f'An error has occurred: {error}')
            break
    # output the file metadata to console
    for file in results:
        print(file)

    return results

# call the function


scopes = ['https://www.googleapis.com/auth/drive.readonly']

credentials = ServiceAccountCredentials.from_json_keyfile_name('client_download2.json', scopes)

http_auth = credentials.authorize(Http())
# drive = build('drive', 'v3', http=http_auth)

drive = build('drive', 'v3', http=http_auth)


all_files = retrieve_all_files(drive)

# request = drive.files().list().execute()
# files = request.get('items', [])
# for f in files:
#     print(f)
    