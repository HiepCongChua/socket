- Cơ bản về giao thức mạng máy tính

* Internet đơn giản chỉ là một mạng lưới giúp các máy tính có khả năng giao tiếp với nhau và các máy tính giao tiếp, trao đổi dữ liệu với nhau dưới dạng packet.
  VD: Browser giao tiếp vs Server, Browser gửi và nhận dữ liệu đến server, dữ liệu ở dạng các packet, mỗi packet được chia ra làm 5 lớp theo thứ tự sau từ trên xuống dưới

- Application
- Transport => UDP/TCP:
- Network => IP
- Link => wifi
- Physical => cables
  Đây là các lớp tạo nên một gói tin (Packet) được gửi và nhận giữa client và server, 2 lớp transport,network, kết hợp với nhau tạo thành bộ giao thức TCP/IP giúp cho 2 hay nhiều máy tính giao tiếp với nhau

* Với tư cách là một developer thì chúng ta thường làm việc với lớp Application (HTTP,FTP,SSH,SMTP)
* Giả sử chúng ta có một máy tính kết nối internet => lớp transport sẽ tạo ra 2^16 cổng trên máy tính của bạn, bất cứ khi nào bạn khởi động một ứng dụng (node chẳng hạn) bạn có thể chạy nó trên port 3000 tức là nó đã chạy trên tập các cổng này.
  Giả sử có một mô hình Client và Server, đứng ở Client sẽ ra sao nếu chúng ta muốn giao tiếp với một máy tính khác (server) qua cổng 80.
  Khi chúng ta ở Client (browser) browser cũng là một chương trình nó cũng sẽ mở một loạt các cổng trên máy tính để gửi và nhận dữ liệu, giả sử browser ở port 3000 trên máy tính, nó sẽ chuyển request đến lớp transport và request sẽ được gói gọn trong cái được gọi là segment, bên trong segement sẽ có thứ gọi là

- meta data
- destination port
- Source port

* Chi tiết về lớp transport trong package

- Ở lớp transport sẽ có 2 giao thức khác nhau là UDP và TCP
- Phân biệt UDP và TCP, ưu nhược điểm của 2 loại giao thức
  => UDP rất nhẹ, khoảng 8 byte cho tiêu đề (header)
  - Nếu bạn sử dụng UDP bạn không cần phải kết nối confirm trước (xác nhận xem máy tính kia có muốn kết nối hay không) mà chúng ta có thể thực hiện kết nối với một máy tính khác ngay lập tức, có thể máy tính kia không cho phép kết nối cũng ko sao, đây thực sự là một lợi thế rất lớn
  - Nhưng UDP có nhược điểm, UDP dew care nếu packet bị thất lạc, nó sẽ tiếp tục gửi các packet, nếu như mạng bị tắc nghẽn ?? UDP đéo care nó vẫn cứ tiếp tục gửi các package
    => UDP nhanh (vì nó nhẹ và nó không cần thiết lập kết nối ban đầu rồi mới gửi request) nhưng nó có một vài nhược điểm
    => UDP thường được sử dụng trong video game, trò chơi real time

=> TCP không giống UDP, nó cần máy đích xác nhận xem có muốn kết nối hay không dựa trên 3 bước.

- Client gửi request yêu cầu kết nối đến server
- Server tiếp nhận gửi trả yêu cầu (đồng ý kết nối hoặc không)
- Client nhận được kết quả từ server từ đó mới tiếp tục gửi request

* TCP cũng có deliverry check tức là kiểm tra xem máy đích đã nhận được package hay chưa, nếu bên máy đích báo chưa nhận được thì máy gửi sẽ gửi lại
  => Với TCP Bạn cũng thể đảm bảo các package được gửi đúng thứ tự bất kể điều gì xảy ra vs mạng
  => Nếu việc nghẽn mạng xảy ra TCP có thể giữ cho việc thất lạc pakage giảm thiểu tối đa

=> Kết luận
=> TCP : tin cập nhưng chậm (HTTP và SocketIO sử dụng giao thức TCP)
=> UDP : nhanh nhưng thiếu sự tin cậy

- Phân biệt TCP và HTTP :

* Nói ngắn gọn TCP là giao thức tầng transport, HTTP là giao thức tầng application hoạt động dựa trên TCP, TCP như bên trên đã nói nó cung cấp một đường ống an toàn mà gói tin có thể chuyển phát giữa 2 máy tính một cách toàn vẹn và bảo mật.
* Điều này có nghĩa chúng là 2 khái niệm hoàn toàn độc lập với nhau nhưng HTTP sẽ hoạt động dựa trên TCP ,
* TCP chịu trách nhiệm thiết lập kết nối giữa 2 máy tính
* HTTP chịu trách nhiệm giúp 2 máy tính giao tiếp với nhau dựa trên kết nối đó, HTTP chủ yếu được sử dụng trong kết nối client/server
* Hệ thống phân giải tên miền DNS => TCP handshake => HTTP connecting.  
  Websocket sử dụng TCP nó là web native technologhy dựa trên javascript, nó cho phép kết nối tới server thông qua TCP, còn socket.io hiểu đơn giản nó như jquer của websocket vậy nó giúp chúng ta làm việc dễ dàng hơn với websocket, nhưng điều cần chú ý rằng nếu socket.io thực hiện kết nối với một server socket khác mà bị thất bại nó sẽ không dùng websocket để giao tiếp nữa mà dung long pooling
* Có thể hiểu đơn giản HTTP và WebSocket là những giao thức giúp 2 máy tính giao tiếp với nhau dựa trên TCP.
* Websocket được tích hợp sẵn trên hầu hết các trình duyệt, nó cũng là một phần của javascript.

=> Socket là gì ?

- Cần phân biệt socket với websocket?

* Socket đơn giản chỉ là một đường ống giúp dữ liệu đi qua giữa 2 máy tính, nó chạy trên TCP (tất nhiên nó thuộc lớp transport)

* Chúng ta có HTTP message bao gồm : Header và Body, Header sẽ cung cấp thông tin về Body thông qua meta-data, máy nhận sẽ xử lý data nằm trong body như thế nào dựa vào Content-Type trong meta-data.

* Chú ý rằng triển khai Websocket trên Client hoàn toàn khác với việc trển khai trên Server.
  khi chúng ta sử dụng WebsocketAPI trên client và Websocket/SocketIO ở giữa chúng

=> Sự khác biệt lớn nhất giữa HTTP và WebSocket ?

- Ở trên trình duyệt được tích hợp sẵ websocket.api, giả sử trình duyệt cần thiết lập kết nối với Node.server...nhưng điều cần phải nhớ rằng node.server không hề biết đến sự tồn tại của websocket.api được tích hơp trên trình duyệt, thậm chí nó cần không biết đến sự tồn tại của websocket (để triển khai websocket trên server chúng ta cần sử dụng các module như socket hay socket.io, những module đóng vai trò như một trình thông dịch giữa socket (node server) và websocket(browser)) nó chỉ biết đến sự tồn tại của socket có nhiệm vụ thiết lập một kết nối socket.
  => Điề u này dẫn đến việc phải có một bên đóng vai trò như một dịch giả để 2 bên có thể giao tiếp được với nhau, lúc này chúng ta sẽ không dùng http và dùng giao thức ws
- Server không thể bắn response về cho client trừ khi client tìm cách kết nối trước, nhưng đối với giao thức websocket điều này hoàn toàn có thể xảy ra.
- Đối với HTTP ngay khi nhận được response thì Server thì sẽ bị ngắt kết nối, đối với giao thức websocket khi browser và server đã thiết lập kết nối xong kết nối này sẽ được duy trì cho đến khi 1 trong 2 bên browser hoặc server muốn ngắt kết nối.

=> Phân biệt socket.io và websocket
SocketIO giúp chúng ta làm việc với Websocket dễ dàng hơn, có thể hiểu đơn giản Websocket như javascript và SocketIO như Jquery, Socket.io triển khai nhưng nhiều hàm tiện ích.

- Ở trong lần đầu tiên connect socket.io ở browser sẽ gửi request dựa trên http (polling) nhằm mục đích thăm dò, nó sẽ yêu cầu server upgrade giao thức lên websocket

Socket - Websocket
Socket được sử dụng để cho phép 1 process nói chuyện với 1 process khác
Socket chạy trên TCP/IP giúp lập trình viên truyền và nhận dữ liệu trong môi trường có kết nối Internet
Một trong số những loại socket đó là Websocket nó là một loại giao thức giúp Client-Server giao tiếp vs nhau, phổ biến nhất là ở mô hình client-server nhưng websocket có thể giúp tất cả các loại ưng dụng giao tiếp vs nhau.
Websocket - Http

- Websocket có kích thước gói tin nhỏ nên có tốc độ nhanh hơn HTTP
  Chuẩn giao thức thông thường của Websocket là ws:// và loại có bảo mật là wss://
- Websocket là giao thức giao tiếp song công (cả client và server đều có thể gửi dữ liệu qua lại bằng cách sử dụng lại kênh kết nối đã thiết lập,kết nối sẽ luôn giữ cho đến khi một trong 2 bên ngắt. đây là loại kết nối có trạng thái).
- Http là kết nối bán song công tức là client phải là bên gửi request trước, request đến server , server trả về response sau đó kết nối sẽ bị ngắt đây là loại kết nối không trạng thái.)
- Ở giai đoạn ban đầu (Bắt tay) client sẽ gửi một http request để yêu cầu nâng cấp lên kết nối WS.
  Websocket-Socket.IO
- Websocket là một loại công nghệ trong khi Socket.IO là một thư viện xây dựng dựa trên Websocket
- Nếu Socket.IO không thể thiết lập kết nối dựa trên Websocket thì nó sẽ chuyển qua Long Pooling trong khi nếu dùng Websocket thì không có phương án thứ 2.
- Socket.IO cũng đóng vai trò là một cầu nối do websocket.api không được tích hợp sẵn trên môi trường Node nên Node không thể làm việc trực tiếp vs websocket (Node chỉ có thể tạo một kết nối socket) dó vậy cần một thư viên bên thứ 3 (Socket.IO)
- Ban đầu khi sử dụng socket.io thì client sẽ khởi tạo kết nối kiểu polling, sau đó mới nâng cấp lên kết nối websocket

=> Một số điều cần chú ý khi làm việc với thư viện socket.io

- Ở phía server

* khi viết const io = socket(server,{option}); tức là chúng ta đang đính kèm một máy chủ socket lên trên một máy chủ http nó sẽ theo truy cập trên máy chủ http và sẽ phụv vụ các kết nối kiểu ws.
* Có một số option cần chú ý đó là path=true(default) và serverClient=true(default) điều này giúp cho client có tệp socket.io.js mà không cần dùng CDN
* Theo mặc định transport=["polling","websocket"] tức là ở giai đoạn ban đầu sẽ chấp nhận poling sau đó dựa vào chất lượng kết nối sẽ upgrade lên websocket, điều này đúng với cả client và server => nếu muốn thiết lập kết nối có thể thêm hoặc bớt phần tử trong mảng=> nhớ là nếu set ở 1 phía thì sẽ phải set cả phía còn lại.
* Namespace: có thể hiểu đơn giản namespace như một chatroom, nó là tập hợp của nhiều socket được kết nối trong với một số scope được xác định bằng path.

- Namespace mặc định sẽ là '/' nếu chúng ta không thiết lập, sự kiện connection ở server chính là khi client đã được kết nối đến namespace mặc định.
- Chú ý rằng sự kiện connection và connect đều là một.

* Socket: Khi server lắng nghe được sự kiện connection (mặc định) nó sẽ invoked callback với đối số của callback là socket, hiểu đơn giản socket như một người quản trị phiên kết nối của client vs server, mỗi socket luôn thuộc về một namespce nhất định, Socket được kế thừa từ module EventEmitter.

- Cứ sau 25s thì server sẽ bắn sự kiện ping về cho client để kiểm tra client có kết nối không, sau khi client nhận được sự kiện ping thì nó emit sự kiện pong về cho server, server sẽ bắn lại cho client để xác nhân nó nhận được sự kiện pong từ client
