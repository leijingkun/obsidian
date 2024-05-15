# web
### Grand Resort for Pwning Cats
给了源码,后端只有一个go rpc
```go
func main() {
	flag := os.Getenv("FLAG")
	err := os.WriteFile("/flag.txt", []byte(flag), 0644)
	if err != nil {
		panic(err)
	}

	lis, err := net.Listen("tcp", "0.0.0.0:38010")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	pb.RegisterReceptionServer(grpcServer, &receptionServer{})
	reflection.Register(grpcServer)
	grpcServer.Serve(lis)
}
```

前端有一个发起rpc请求的,但是参数无法自己输入,推测要原型链污染?然后ssrf?

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-05-14   23:34