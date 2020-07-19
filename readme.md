## Building docker image process

### Step 1
Build the image in production mode
command: 
```bash
ENV_FILE=.env.prod docker-compose -f docker-compose.build.yml build
```

### Step 2
Uploading the image in docker hub
```bash
# Add tag on repo
docker tag local_image_name repo_name:tag_name
# example: docker tag test_dashboard naimur103/test_dashboard:latest

# Push to repo
docker push repo_name:tag_name
# example: docker push naimur103/test_dashboard:latest
``` 
NOTE: If docker asks for login then login with your docker creds in terminal

## Using docker pushed image

### Step 3
Pull from docker hub
```bash
docker pull repo_name:tagname
# example: docker pull naimur103/test_dashboard:latest
```
### Step 4
Run the production build and navigate to http://localhost:1234
```bash
ENV_FILE=.env.local docker-compose -f docker-compose.local-prod.yml 
up
```
