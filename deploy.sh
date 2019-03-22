docker build -t donibtk/beta-sabre-web:latest -t donibtk/beta-sabre-web:$SHA ./

docker push donibtk/beta-sabre-web:latest

docker push donibtk/beta-sabre-web:$SHA
