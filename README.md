# Online_IDE
An Online real-time collaborative IDE.

## Installation and Execution Instructions
### Step-1: Installing runtime environments and other tools
1.Install git - https://www.youtube.com/watch?v=cJTXh7g-uCM     
1.download gcc compiler-https://www.youtube.com/watch?v=WWTocqPrzMk     
2.download jdk    
3.download nodejs     
4.download python    
5.set environment variables for above    
6.install MongoDB (with compass and shell)- https://www.youtube.com/watch?v=CK50OGxCtaM     
7.install redis -(tutorial) https://www.youtube.com/watch?v=nB7zi88DB1Y       
(documentation)https://redis.io/docs/getting-started/installation/install-redis-on-windows/    
    
### Step-2: Cloning the project to local repository
in vscode, open folder repos, open terminal and write below command     
**git clone https://github.com/syedshoaibahmed48/Online_IDE.git**
   
     
### Step-3: Installing node packages
in vscode, open folder Online_IDE, open terminal and write below commands in sequence
1. **cd backend && npm install**
2. **cd .. && cd frontend && npm install npm install**


### Step-4: Running the Application

#### <ins>1.Start redis server</ins>
in cmd, enter below commands and wnter password whenever needed    
**wsl**     
**sudo service redis-server start**    

(optional)     
To access redis cli: **redis-cli**     
To stop redis server **sudo service redis-server stop**   
     
        
#### <ins>2.To run server and frontend</ins>
in vscode, open folder Online_IDE, open two terminals    
in terminal-1   
**cd frontend && npm start**     
in terminal-2    
**cd backend && npm start**   
(to close) **CTRL+C**, and then **y** when prompted.

#### <ins>3.To view Database using MongoDB compass</ins>
using mongodb compass connect to DB using below connection string     
**mongodb://127.0.0.1/**