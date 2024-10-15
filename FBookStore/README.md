# ams-estation
mec-be, this is used for authentication and authorization 
* java >= 17
  -run app: mvn spring-boot:run
* build docker
  - Build image: 
		 docker build --tag java-docker .
  - Run (if it has error when run ./mvnw): 
		 sed -i 's/\r$//' mvnw
		 
# build docker mysql
docker run -it --rm -d -v mysql_estation_data:/var/lib/mysql \
-v mysql_estation_config:/etc/mysql/conf.d \
--network amsestation \
--name mysqlams \
-e MYSQL_USER=thanhhuy -e MYSQL_PASSWORD=thanhhuy \
-e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=thanhhuy \
-p 3308:3308 mysql:8.0

#run app with mysql db
docker run --rm -d --name ams-server --network amsestation -e MYSQL_URL=jdbc:mysql://mysqlams/thanhhuy -p 8080:8080 amsestation

# react app
- node: >= 18
