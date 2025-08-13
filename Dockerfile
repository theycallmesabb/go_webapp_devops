FROM golang:1.22 AS base
#making a working directory
WORKDIR /app

# dependencies are stored in mod file.SO we need to copy them first/
COPY go.mod .  
# to download all the dependencies
RUN go mod download

#copy the source code of app
COPY . .

#build ( artifact will be created in docker image)
RUN go build -o main .

#Exposing the port so that we can access it through that port
#EXPOSE 8080
#CMD["./main"]

#for reduced size image and enhanced security we will create a distroless image
# we will create a new stage
#Final stage - Distroless image

FROM gcr.io/distroless/base

#copy the binary of main to that distroless image
COPY --from=base /app/main .

#copying the static content/file(that are not bundled in the binary)
COPY --from=base /app/static ./static

#Now expose the port
EXPOSE 8080

CMD ["./main"] 
