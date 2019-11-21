href='https://logs-01.loggly.com/inputs/58a37e7d-e7c9-4cc5-8c92-00f96681d2ad/tag/test/'

curl -H "content-type:text/plain" -d 'Hello' $href
curl -H "content-type:application/x-www-form-urlencoded" -d "{\"message\":\"hello world\", \"from\":\"hoover\"}" $href
curl -H "content-type:text/plain" -d $'Hello\nWorld' $href