# Online_IDE
An Online real-time collaborative IDE.

## Installation and Execution Instructions
### Step-1: Installing runtime environments and other tools
#### 1.Install 
  * git - https://www.youtube.com/watch?v=cJTXh7g-uCM     
  * gcc compiler-https://www.youtube.com/watch?v=WWTocqPrzMk     
  * jdk    
  * nodejs     
  * python    
#### 2.set environment variables for above    
#### 3.install MongoDB (with compass and shell)- https://www.youtube.com/watch?v=CK50OGxCtaM     
#### 4.install redis -(tutorial) https://www.youtube.com/watch?v=nB7zi88DB1Y       
(documentation)https://redis.io/docs/getting-started/installation/install-redis-on-windows/    
    
### Step-2: Cloning the project to local repository
in vscode, open folder repos, open terminal and write below command     
**git clone https://github.com/syedshoaibahmed48/Online_IDE.git**
   
     
### Step-3: Installing node packages
in vscode, open folder Online_IDE, open terminal and write below commands in sequence
1. **cd client && npm install**
2. **cd .. && cd codeexecstoreserver && npm install**
3. **cd .. && cd collabauthserver && npm install**


### Step-4: Running the Application

#### <ins>1.Start redis server</ins>
in cmd, enter below commands and enter password whenever needed    
**wsl**     
**sudo service redis-server start**    

(optional)     
To access redis cli: **redis-cli**     
To stop redis server **sudo service redis-server stop**   
to empty redis db: **FLUSHDB**
     
        
#### <ins>2.To run server and frontend</ins>
in vscode, open folder Online_IDE, open two terminals    
in terminal-1   
**cd client && npm run dev**     
in terminal-2    
**cd codeexecstoreserver && npm run dev**   
(to close) **CTRL+C**, and then **y** if prompted.    
in terminal-3
**cd collabauthserver && npm run dev** 

#### <ins>3.To view Database using MongoDB compass</ins>
using mongodb compass connect to DB using below connection string     
**mongodb://127.0.0.1/**

MongoDB commands:
1. **show dbs** - to show all databases
2. **use <db_name>** - to use a database
3. **show collections** - to show all collections in a database
4. **db.users.updateOne({_id : ObjectId('2313216556454')}, {$set : {"userProjects": []}})** - to clear userProjects array in users collection
5. **db.users.updateOne({_id : ObjectId('2313216556454')}, {$set : {"collabProjects": []}})** - to clear collabProjects array in users collection