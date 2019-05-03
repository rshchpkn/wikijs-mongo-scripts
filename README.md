# Command to start mongo scripts
```
mongo -eval "DB_NAME='<Db Name>', DB_PASS='<password>>'" <Script Path>
```
# Command to create ssh tunnel with remote server
```
ssh -L <LocalPort>:<RemoteHost>:<RemotePort> <User>@<HostToConnectTo>
```
`-l` flag used to create port tunnel

# Requirments

- MongoDB installed locally and remotely