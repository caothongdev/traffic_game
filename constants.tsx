
import { Question, Player } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Khi đèn vàng bật sáng (không nhấp nháy), người lái xe phải làm gì?",
    options: [
      "Tăng tốc để vượt qua ngã tư",
      "Dừng lại trước vạch dừng",
      "Đi tiếp nếu thấy không có xe khác",
      "Bấm còi và đi nhanh"
    ],
    correctIndex: 1
  },
  {
    id: 2,
    text: "Tại ngã tư không có biển báo ưu tiên và không có đèn tín hiệu, bạn nhường đường cho ai?",
    options: [
      "Xe đi từ bên trái",
      "Xe đi từ bên phải",
      "Xe lớn hơn",
      "Xe đi nhanh hơn"
    ],
    correctIndex: 1
  },
  {
    id: 3,
    text: "Biển báo hình tròn, viền đỏ, nền trắng, có hình vẽ đen gạch chéo là loại biển gì?",
    options: [
      "Biển báo nguy hiểm",
      "Biển báo hiệu lệnh",
      "Biển báo cấm",
      "Biển chỉ dẫn"
    ],
    correctIndex: 2
  },
  {
    id: 4,
    text: "Người lái xe mô tô có được phép buông cả hai tay khi đang tham gia giao thông không?",
    options: [
      "Được phép nếu đường vắng",
      "Chỉ được buông một tay",
      "Tuyệt đối không được phép",
      "Được phép khi đi tốc độ chậm"
    ],
    correctIndex: 2
  },
  {
    id: 5,
    text: "Vạch kẻ đường màu vàng nét đứt có ý nghĩa gì?",
    options: [
      "Phân chia các làn xe cùng chiều",
      "Phân chia hai chiều xe chạy ngược chiều nhau",
      "Cấm các xe đè lên vạch",
      "Chỉ dành cho xe buýt"
    ],
    correctIndex: 1
  },
  {
    id: 6,
    text: "Nồng độ cồn cho phép đối với người điều khiển xe ô tô là bao nhiêu?",
    options: [
      "Dưới 0.25 miligam/1 lít khí thở",
      "Dưới 50 miligam/100 mililít máu",
      "Tuyệt đối bằng 0 (Cấm hoàn toàn)",
      "Tùy vào tửu lượng"
    ],
    correctIndex: 2
  },
  {
    id: 7,
    text: "Khi gặp xe cứu thương đang phát tín hiệu ưu tiên, bạn phải làm gì?",
    options: [
      "Tăng tốc chạy trước xe cứu thương",
      "Giữ nguyên tốc độ và làn đường",
      "Nhường đường bằng cách đi về phía bên phải",
      "Bấm còi chào hỏi"
    ],
    correctIndex: 2
  },
  {
    id: 8,
    text: "Người ngồi trên xe máy bắt buộc đội mũ bảo hiểm khi nào?",
    options: [
      "Chỉ khi đi trên đường quốc lộ",
      "Khi tham gia giao thông trên đường bộ",
      "Chỉ khi thấy cảnh sát giao thông",
      "Chỉ khi trời mưa"
    ],
    correctIndex: 1
  },
  {
    id: 9,
    text: "Tốc độ tối đa cho phép đối với xe ô tô con trên đường cao tốc là bao nhiêu?",
    options: [
      "80 km/h",
      "100 km/h",
      "120 km/h",
      "140 km/h"
    ],
    correctIndex: 2
  },
  {
    id: 10,
    text: "Vạch kẻ đường màu trắng liền có nghĩa là gì?",
    options: [
      "Phân chia làn xe, không được phép vượt qua",
      "Chỉ dành cho xe buýt",
      "Được phép vượt qua",
      "Đường dành cho xe máy"
    ],
    correctIndex: 0
  },
  {
    id: 11,
    text: "Khoảng cách an toàn tối thiểu giữa hai xe khi đi trong đường hầm là bao nhiêu?",
    options: [
      "10m",
      "30m",
      "50m",
      "100m"
    ],
    correctIndex: 2
  },
  {
    id: 12,
    text: "Khi tham gia giao thông, người lái xe có được phép sử dụng điện thoại di động không?",
    options: [
      "Được phép nếu dùng tai nghe",
      "Được phép khi đi chậm",
      "Không được phép",
      "Chỉ được gọi khẩn cấp"
    ],
    correctIndex: 2
  },
  {
    id: 13,
    text: "Biển báo hình tam giác đều, viền đỏ, nền vàng là loại biển gì?",
    options: [
      "Biển báo cấm",
      "Biển báo nguy hiểm",
      "Biển hiệu lệnh",
      "Biển chỉ dẫn"
    ],
    correctIndex: 1
  },
  {
    id: 14,
    text: "Xe mô tô có được phép chở quá 2 người không?",
    options: [
      "Được nếu cả 3 người đều đội mũ bảo hiểm",
      "Được nếu đường vắng",
      "Không được phép",
      "Được nếu người thứ 3 là trẻ em dưới 12 tuổi"
    ],
    correctIndex: 2
  },
  {
    id: 15,
    text: "Khi xe của bạn bị hỏng trên đường cao tốc, bạn phải làm gì?",
    options: [
      "Dừng xe ngay và sửa chữa",
      "Bật đèn cảnh báo và đặt biển báo hiệu ở phía sau xe",
      "Gọi người thân đến giúp",
      "Đẩy xe về nhà"
    ],
    correctIndex: 1
  },
  {
    id: 16,
    text: "Tuổi tối thiểu để được cấp giấy phép lái xe mô tô hạng A1 là?",
    options: [
      "16 tuổi",
      "18 tuổi",
      "21 tuổi",
      "25 tuổi"
    ],
    correctIndex: 1
  },
  {
    id: 17,
    text: "Khi có biển báo 'Cấm dừng xe và đỗ xe', bạn có được phép dừng xe tạm thời để đón người không?",
    options: [
      "Được phép nếu dưới 5 phút",
      "Được phép nếu không cản trở giao thông",
      "Không được phép",
      "Được phép nếu bật đèn cảnh báo"
    ],
    correctIndex: 2
  },
  {
    id: 18,
    text: "Khoảng cách an toàn khi đi sau xe khác trên đường thường là?",
    options: [
      "Ít nhất bằng vận tốc xe đang chạy (km/h = mét)",
      "5 mét",
      "10 mét",
      "Không quy định"
    ],
    correctIndex: 0
  },
  {
    id: 19,
    text: "Xe ưu tiên được phép đi ngược chiều khi nào?",
    options: [
      "Khi đang làm nhiệm vụ khẩn cấp và có tín hiệu ưu tiên",
      "Khi đường vắng",
      "Bất cứ lúc nào",
      "Không bao giờ"
    ],
    correctIndex: 0
  },
  {
    id: 20,
    text: "Đèn tín hiệu giao thông màu xanh nhấp nháy có nghĩa là gì?",
    options: [
      "Dừng lại ngay",
      "Tăng tốc qua ngã tư",
      "Chuẩn bị chuyển sang đèn đỏ",
      "Đi chậm và quan sát"
    ],
    correctIndex: 3
  },
  {
    id: 21,
    text: "Người điều khiển xe mô tô có được phép vận chuyển hàng hóa cồng kềnh không?",
    options: [
      "Được phép",
      "Không được phép",
      "Được phép nếu đi đường vắng",
      "Được phép nếu buộc chặt"
    ],
    correctIndex: 1
  },
  {
    id: 22,
    text: "Khi vượt xe khác, bạn phải vượt về phía nào?",
    options: [
      "Bên trái",
      "Bên phải",
      "Bên nào cũng được",
      "Tùy tình huống"
    ],
    correctIndex: 0
  },
  {
    id: 23,
    text: "Tại nơi giao nhau không có tín hiệu đèn, xe nào được quyền đi trước?",
    options: [
      "Xe đi từ đường ưu tiên",
      "Xe lớn hơn",
      "Xe đi nhanh hơn",
      "Xe đến trước"
    ],
    correctIndex: 0
  },
  {
    id: 24,
    text: "Biển số 'P.102' (nền xanh, chữ trắng) là biển gì?",
    options: [
      "Biển chỉ dẫn bãi đỗ xe",
      "Biển cấm đỗ xe",
      "Biển báo nguy hiểm",
      "Biển hiệu lệnh"
    ],
    correctIndex: 0
  },
  {
    id: 25,
    text: "Người lái xe có được phép quay đầu xe ở phần đường dành cho người đi bộ qua đường không?",
    options: [
      "Được phép nếu không có người đi bộ",
      "Được phép nếu có người điều khiển",
      "Không được phép",
      "Được phép vào ban đêm"
    ],
    correctIndex: 2
  },
  {
    id: 26,
    text: "Khi tham gia giao thông trên đường cao tốc, xe mô tô có được phép lưu thông không?",
    options: [
      "Được phép",
      "Không được phép",
      "Chỉ xe mô tô phân khối lớn",
      "Tùy theo quy định từng đoạn đường"
    ],
    correctIndex: 1
  },
  {
    id: 27,
    text: "Tốc độ tối đa cho xe mô tô đi trong khu vực dân cư là?",
    options: [
      "30 km/h",
      "40 km/h",
      "50 km/h",
      "60 km/h"
    ],
    correctIndex: 2
  },
  {
    id: 28,
    text: "Người lái xe phải giảm tốc độ, đi sát về bên phải khi nào?",
    options: [
      "Khi có xe xin vượt",
      "Khi đường vắng",
      "Khi muốn dừng xe",
      "Khi gặp biển chỉ dẫn"
    ],
    correctIndex: 0
  },
  {
    id: 29,
    text: "Khi điều khiển xe qua đường sắt có rào chắn, bạn phải làm gì?",
    options: [
      "Tăng tốc qua nhanh",
      "Dừng lại trước rào chắn, quan sát và đi qua khi an toàn",
      "Bấm còi liên tục",
      "Đi chậm qua"
    ],
    correctIndex: 1
  },
  {
    id: 30,
    text: "Biển báo 'Cấm rẽ trái' có hiệu lực đối với xe nào?",
    options: [
      "Tất cả các loại xe",
      "Chỉ xe ô tô",
      "Chỉ xe mô tô",
      "Xe không có giấy phép"
    ],
    correctIndex: 0
  },
  {
    id: 31,
    text: "Trong khu dân cư, người lái xe được phép sử dụng còi từ mấy giờ?",
    options: [
      "Không hạn chế",
      "Từ 5h sáng đến 22h tối",
      "Từ 6h sáng đến 21h tối",
      "Không được sử dụng còi"
    ],
    correctIndex: 1
  },
  {
    id: 32,
    text: "Khi tới gần vị trí giao nhau có đèn điều khiển, đèn đã chuyển sang vàng, nếu thấy xe phía sau đi rất gần, bạn xử lý như thế nào?",
    options: [
      "Tăng tốc cho xe qua nhanh",
      "Quan sát phía trước, nếu không có ai thì cho xe tiếp tục qua",
      "Phanh gấp để dừng lại",
      "Giảm tốc cho xe chậm lại và dừng lại"
    ],
    correctIndex: 3
  },
  {
    id: 33,
    text: "Người điều khiển xe mô tô hai bánh, ba bánh được vận chuyển hành khách tối đa là bao nhiêu người?",
    options: [
      "1 người",
      "2 người",
      "3 người",
      "Không hạn chế"
    ],
    correctIndex: 0
  },
  {
    id: 34,
    text: "Vạch kẻ màu vàng liền có tác dụng gì?",
    options: [
      "Phân chia hai chiều xe chạy, không được phép vượt",
      "Chỉ vị trí dừng xe",
      "Báo hiệu đường dành cho xe buýt",
      "Phân chia làn xe cùng chiều"
    ],
    correctIndex: 0
  },
  {
    id: 35,
    text: "Trên đường có nhiều làn đường cho xe đi cùng chiều được phân biệt bằng vạch kẻ ngang, người lái xe phải cho xe đi như thế nào?",
    options: [
      "Cho xe đi trên bất kỳ làn đường nào",
      "Đi đúng làn đường quy định",
      "Chuyển làn liên tục",
      "Đi giữa 2 làn"
    ],
    correctIndex: 1
  },
  {
    id: 36,
    text: "Trên đường đang có tuyết, có băng, người lái xe xử lý như thế nào?",
    options: [
      "Tăng tốc đi nhanh",
      "Đi với tốc độ chậm và giữ khoảng cách an toàn",
      "Phanh gấp nhiều lần",
      "Không thay đổi tốc độ"
    ],
    correctIndex: 1
  },
  {
    id: 37,
    text: "Khi điều khiển xe chạy với tốc độ dưới 60km/h, để đảm bảo khoảng cách an toàn giữa hai xe, người lái xe phải điều khiển xe như thế nào?",
    options: [
      "Cách xe trước ít nhất 10m",
      "Cách xe trước ít nhất 20m",
      "Cách xe trước ít nhất 35m",
      "Cách xe trước một khoảng cách an toàn tùy tình huống"
    ],
    correctIndex: 3
  },
  {
    id: 38,
    text: "Khi điều khiển xe mô tô, người lái xe phải bật đèn tín hiệu báo rẽ trong trường hợp nào?",
    options: [
      "Khi cho xe chạy thẳng",
      "Khi cho xe rẽ trái, rẽ phải, chuyển hướng, chuyển làn đường",
      "Khi dừng xe",
      "Khi tăng tốc"
    ],
    correctIndex: 1
  },
  {
    id: 39,
    text: "Người lái xe được phép lùi xe ở những khu vực nào?",
    options: [
      "Trên cầu, đầu cầu",
      "Nơi đường bộ giao nhau",
      "Trên đường cao tốc",
      "Nơi cho phép"
    ],
    correctIndex: 3
  },
  {
    id: 40,
    text: "Khi điều khiển xe mô tô tay ga xuống dốc dài, độ dốc cao, người lái xe cần thực hiện các thao tác nào?",
    options: [
      "Nhả hết ga, tắt máy",
      "Giữ tay ga ở mức phù hợp, kết hợp phanh trước và phanh sau",
      "Đạp phanh liên tục",
      "Nhả ga và chỉ sử dụng phanh trước"
    ],
    correctIndex: 1
  },
  {
    id: 41,
    text: "Biển nào cấm người đi bộ?",
    options: [
      "Biển tròn, viền đỏ, nền trắng, có hình người đi bộ",
      "Biển tam giác đều",
      "Biển hình chữ nhật màu xanh",
      "Biển hình vuông"
    ],
    correctIndex: 0
  },
  {
    id: 42,
    text: "Người lái xe mô tô xử lý như thế nào khi cho xe vào đường cao tốc?",
    options: [
      "Tăng tốc nhanh chóng",
      "Quan sát và tăng tốc cho phù hợp với tốc độ xe trên đường cao tốc",
      "Đi chậm lại",
      "Dừng xe quan sát"
    ],
    correctIndex: 1
  },
  {
    id: 43,
    text: "Người lái xe không được vượt xe khác khi nào?",
    options: [
      "Khi đường vắng",
      "Khi tầm nhìn bị che khuất",
      "Khi đường thẳng",
      "Khi có làn vượt"
    ],
    correctIndex: 1
  },
  {
    id: 44,
    text: "Trong các hành vi dưới đây, hành vi nào là đúng khi sử dụng đường bộ?",
    options: [
      "Dừng xe, đỗ xe trên phần đường dành cho người đi bộ",
      "Che chắn, làm ảnh hưởng tầm nhìn của người lái xe",
      "Chấp hành quy tắc giao thông đường bộ",
      "Vứt rác ra đường"
    ],
    correctIndex: 2
  },
  {
    id: 45,
    text: "Khi điều khiển xe chạy trên đường biết có xe sau xin vượt nếu đủ điều kiện an toàn, người lái xe phải làm gì?",
    options: [
      "Tăng tốc không cho vượt",
      "Giảm tốc độ, đi sát về bên phải để xe sau vượt qua",
      "Tạt sang trái để nhường đường",
      "Giữ nguyên tốc độ"
    ],
    correctIndex: 1
  },
  {
    id: 46,
    text: "Khi điều khiển xe cơ giới, người lái xe phải có hành vi như thế nào tại nơi có biển báo hết mọi lệnh cấm?",
    options: [
      "Không có lệnh cấm nào nữa, tăng tốc",
      "Hết các lệnh cấm trước đó nhưng vẫn phải tuân thủ biển báo phía trước",
      "Dừng xe kiểm tra",
      "Quay đầu xe"
    ],
    correctIndex: 1
  },
  {
    id: 47,
    text: "Xe con được phép kéo xe khác trong trường hợp nào?",
    options: [
      "Xe bị hỏng kéo bằng dây cáp, thanh nối cứng với điều kiện đảm bảo an toàn",
      "Không được phép",
      "Chỉ trong khu dân cư",
      "Chỉ khi có giấy phép"
    ],
    correctIndex: 0
  },
  {
    id: 48,
    text: "Người lái xe mô tô có được phép quay đầu tại nơi giao nhau không?",
    options: [
      "Được phép khi có biển báo cho phép",
      "Không được phép",
      "Được phép khi đường vắng",
      "Chỉ quay đầu vào ban đêm"
    ],
    correctIndex: 0
  },
  {
    id: 49,
    text: "Trong điều kiện giao thông thuận lợi, để giảm tình trạng ô nhiễm môi trường, người lái xe cần thực hiện như thế nào?",
    options: [
      "Tăng ga liên tục",
      "Giữ tốc độ ổn định, hạn chế phanh, tăng ga đột ngột",
      "Phanh liên tục",
      "Tắt máy khi dừng đèn đỏ"
    ],
    correctIndex: 1
  },
  {
    id: 50,
    text: "Người điều khiển xe mô tô chở hàng cồng kềnh phải đảm bảo yêu cầu như thế nào?",
    options: [
      "Hàng hóa xếp gọn gàng, chằng buộc chắc chắn, không gây mất an toàn",
      "Chỉ cần chắc chắn",
      "Hàng xếp cao không sao",
      "Không có quy định"
    ],
    correctIndex: 0
  },
  {
    id: 51,
    text: "Trường hợp đặc biệt, xe được phép quay đầu tại nơi có biển 'Cấm quay đầu xe' là?",
    options: [
      "Xe ưu tiên đang làm nhiệm vụ",
      "Xe của lãnh đạo",
      "Xe taxi",
      "Không trường hợp nào"
    ],
    correctIndex: 0
  },
  {
    id: 52,
    text: "Khi điều khiển xe mô tô quay đầu, người lái xe cần thực hiện như thế nao?",
    options: [
      "Bật tín hiệu báo rẽ trước khi quay đầu",
      "Quan sát, giảm tốc độ đến mức có thể dừng lại",
      "Nhường đường cho xe đi ngược chiều và người đi bộ",
      "Tất cả các ý trên"
    ],
    correctIndex: 3
  },
  {
    id: 53,
    text: "Trên đường cao tốc, người lái xe xử lý như thế nào khi có tuýp nước mưa, sương mù?",
    options: [
      "Tăng tốc cho xe chạy nhanh",
      "Giảm tốc độ, bật đèn chiếu sáng gần và đèn vàng",
      "Đi với tốc độ bình thường",
      "Tắt đèn và đi chậm"
    ],
    correctIndex: 1
  },
  {
    id: 54,
    text: "Tại ngã ba, ngã tư có đèn điều khiển giao thông, khi đèn đỏ đã bật sáng thì những xe nào được phép đi?",
    options: [
      "Xe đi từ các hướng đều phải dừng lại",
      "Xe rẽ phải trong trường hợp đủ điều kiện an toàn",
      "Xe quay đầu",
      "Xe đi thẳng"
    ],
    correctIndex: 1
  },
  {
    id: 55,
    text: "Người điều khiển xe mô tô đi vào đường cao tốc phải có tốc độ tối thiểu là bao nhiêu?",
    options: [
      "40 km/h",
      "50 km/h",
      "60 km/h",
      "Xe mô tô không được phép đi vào đường cao tốc"
    ],
    correctIndex: 3
  },
  {
    id: 56,
    text: "Người điều khiển xe mô tô có được phép sử dụng ô khi trời mưa không?",
    options: [
      "Được phép",
      "Chỉ sử dụng áo mưa",
      "Được dùng ô nhỏ",
      "Tùy hoàn cảnh"
    ],
    correctIndex: 1
  },
  {
    id: 57,
    text: "Khi gặp xe ngược chiều, người lái xe xử lý như thế nào là đúng quy tắc giao thông?",
    options: [
      "Tăng tốc và đi sát bên trái",
      "Giảm tốc độ, đi về phía bên phải",
      "Giữ nguyên tốc độ, đi sát giữa đường",
      "Dừng xe và nhường đường"
    ],
    correctIndex: 1
  },
  {
    id: 58,
    text: "Biển báo 'Đường một chiều' có hình dạng như thế nào?",
    options: [
      "Hình chữ nhật, nền xanh, mũi tên trắng",
      "Hình tròn, viền đỏ",
      "Hình tam giác",
      "Hình vuông"
    ],
    correctIndex: 0
  },
  {
    id: 59,
    text: "Khi xe ô tô đang chạy mà bị mất lái (không điều khiển được tay lái), người lái xe phải làm gì?",
    options: [
      "Đạp phanh gấp",
      "Tìm cách giảm tốc độ, đưa xe ra khỏi phần đường đang chạy",
      "Nhảy ra khỏi xe",
      "Tắt máy ngay"
    ],
    correctIndex: 1
  },
  {
    id: 60,
    text: "Người điều khiển xe mô tô, ô tô có được sử dụng rượu, bia trước và trong khi lái xe không?",
    options: [
      "Được sử dụng ít",
      "Không được sử dụng",
      "Được sử dụng nếu nồng độ cồn thấp",
      "Được sử dụng vào ban đêm"
    ],
    correctIndex: 1
  },
  {
    id: 61,
    text: "Biển báo 'Cấm đi ngược chiều' có hình thức như thế nào?",
    options: [
      "Hình tròn, viền đỏ, nền trắng, có thanh ngang màu đỏ",
      "Hình tam giác",
      "Hình vuông",
      "Hình chữ nhật"
    ],
    correctIndex: 0
  },
  {
    id: 62,
    text: "Khi xe ô tô bị hư hỏng trên đường cao tốc, người lái xe phải đưa xe vào làn nào?",
    options: [
      "Làn dừng xe khẩn cấp",
      "Làn ngoài cùng bên trái",
      "Giữa đường",
      "Làn nào cũng được"
    ],
    correctIndex: 0
  },
  {
    id: 63,
    text: "Để báo hiệu cho xe phía trước biết xe mình muốn vượt, người lái xe phải làm gì?",
    options: [
      "Bật đèn pha liên tục",
      "Bấm còi, bật đèn xi nhan trái",
      "La hét",
      "Chỉ cần vượt"
    ],
    correctIndex: 1
  },
  {
    id: 64,
    text: "Khi lái xe trong khu dân cư, người lái xe cần lưu ý điều gì?",
    options: [
      "Giảm tốc độ, thường xuyên bấm còi",
      "Giảm tốc độ, quan sát cẩn thận, hạn chế bấm còi",
      "Tăng tốc để qua nhanh khu dân cư",
      "Đi với tốc độ bình thường"
    ],
    correctIndex: 1
  },
  {
    id: 65,
    text: "Trên đường đang có nhiều phương tiện lưu thông, người lái xe thực hiện vượt khi nào?",
    options: [
      "Khi không đảm bảo khoảng cách an toàn",
      "Khi đủ điều kiện an toàn",
      "Khi đường thẳng",
      "Bất kỳ lúc nào"
    ],
    correctIndex: 1
  },
  {
    id: 66,
    text: "Người lái xe thực hiện như thế nào khi quan sát phía trước thấy người đi bộ đang sang đường tại nơi có vạch đường dành cho người đi bộ?",
    options: [
      "Giảm tốc độ, dừng xe nhường đường cho người đi bộ",
      "Bấm còi để người đi bộ nhường đường",
      "Tăng tốc cho xe đi nhanh qua trước",
      "Lái xe tránh người đi bộ"
    ],
    correctIndex: 0
  },
  {
    id: 67,
    text: "Biển báo nguy hiểm có màu nền và viền là màu gì?",
    options: [
      "Nền trắng, viền đỏ",
      "Nền vàng, viền đỏ",
      "Nền xanh, viền trắng",
      "Nền đỏ, viền vàng"
    ],
    correctIndex: 1
  },
  {
    id: 68,
    text: "Khi gặp xe ưu tiên đang phát tín hiệu ưu tiên, người lái xe phải xử lý như thế nào?",
    options: [
      "Nhanh chóng tránh về bên phải đường và dừng lại",
      "Tiếp tục đi với tốc độ bình thường",
      "Tăng tốc vượt qua",
      "Dừng giữa đường"
    ],
    correctIndex: 0
  },
  {
    id: 69,
    text: "Trên đường hẹp, khi gặp xe ngược chiều, người lái xe phải làm gì?",
    options: [
      "Tăng tốc để qua nhanh",
      "Giảm tốc độ, đi sát bên phải, nhường đường cho xe ngược chiều",
      "Dừng xe giữa đường",
      "Bấm còi liên tục"
    ],
    correctIndex: 1
  },
  {
    id: 70,
    text: "Tại vị trí đường giao nhau, nếu không có biển báo, người lái xe phải nhường đường như thế nào?",
    options: [
      "Xe đi trên đường ưu tiên, đường chính được quyền đi trước",
      "Xe lớn được đi trước",
      "Xe nào đến trước đi trước",
      "Xe nào đi nhanh hơn đi trước"
    ],
    correctIndex: 0
  },
  {
    id: 71,
    text: "Người lái xe mô tô có được phép chở người ngồi sau dưới 12 tuổi không?",
    options: [
      "Không được phép",
      "Được phép nếu có thiết bị bảo vệ phù hợp",
      "Chỉ được phép nếu cao trên 1,2m",
      "Tùy hoàn cảnh"
    ],
    correctIndex: 1
  },
  {
    id: 72,
    text: "Khi dừng xe, đỗ xe trên đường phố, người lái xe phải thực hiện như thế nào?",
    options: [
      "Dừng xe bất kỳ đâu",
      "Dừng xe đúng nơi quy định",
      "Dừng xe giữa đường",
      "Dừng xe trên vỉa hè"
    ],
    correctIndex: 1
  },
  {
    id: 73,
    text: "Biển báo 'Nguy hiểm khác' có hình thức như thế nào?",
    options: [
      "Hình tam giác, viền đỏ, nền vàng, có dấu chấm than",
      "Hình tròn, viền đỏ",
      "Hình vuông",
      "Hình chữ nhật"
    ],
    correctIndex: 0
  },
  {
    id: 74,
    text: "Người điều khiển xe mô tô có được phép sử dụng còi khi đi qua khu dân cư vào ban đêm không?",
    options: [
      "Được phép",
      "Không được phép trừ trường hợp cần thiết",
      "Tùy ý",
      "Chỉ được bấm nhẹ"
    ],
    correctIndex: 1
  },
  {
    id: 75,
    text: "Khi tham gia giao thông, người lái xe cần chú ý điều gì để đảm bảo an toàn?",
    options: [
      "Chỉ chú ý xe phía trước",
      "Quan sát toàn diện, dự đoán tình huống",
      "Chỉ nhìn biển báo",
      "Đi theo xe phía trước"
    ],
    correctIndex: 1
  },
  {
    id: 76,
    text: "Khi điều khiển xe mô tô trên đường, người lái xe phải có giấy tờ gì?",
    options: [
      "Giấy phép lái xe, giấy đăng ký xe",
      "Chỉ cần giấy phép lái xe",
      "Chỉ cần giấy đăng ký xe",
      "Không cần giấy tờ"
    ],
    correctIndex: 0
  },
  {
    id: 77,
    text: "Người lái xe không được vượt xe khác tại những vị trí nào?",
    options: [
      "Nơi đường giao nhau, đường bộ giao với đường sắt",
      "Đường thẳng, tầm nhìn rõ ràng",
      "Trên cầu vượt",
      "Đường cao tốc"
    ],
    correctIndex: 0
  },
  {
    id: 78,
    text: "Biển báo có hình tròn, nền xanh, viền trắng thuộc nhóm biển gì?",
    options: [
      "Biển báo cấm",
      "Biển báo nguy hiểm",
      "Biển hiệu lệnh",
      "Biển chỉ dẫn"
    ],
    correctIndex: 2
  },
  {
    id: 79,
    text: "Khi điều khiển xe chạy trên đường, gặp biển chỉ dẫn, người lái xe phải làm gì?",
    options: [
      "Bỏ qua không cần chú ý",
      "Thực hiện theo chỉ dẫn của biển",
      "Chỉ tham khảo",
      "Tự quyết định"
    ],
    correctIndex: 1
  },
  {
    id: 80,
    text: "Người lái xe được phép quay đầu xe ở đâu?",
    options: [
      "Trên cầu, đường hầm",
      "Nơi có biển báo cấm quay đầu",
      "Nơi được phép quay đầu",
      "Bất kỳ đâu"
    ],
    correctIndex: 2
  },
  {
    id: 81,
    text: "Tại nơi đường bộ giao nhau cùng mức với đường sắt, khi đèn tín hiệu màu đỏ đã bật sáng hoặc có tiếng chuông báo hiệu, người tham gia giao thông phải làm gì?",
    options: [
      "Tăng tốc qua nhanh",
      "Dừng lại ngay và giữ khoảng cách tối thiểu 5m tính từ ray gần nhất",
      "Quan sát rồi đi chậm qua",
      "Dừng sát ray đường sắt"
    ],
    correctIndex: 1
  },
  {
    id: 82,
    text: "Khi xe ô tô đang lưu thông với tốc độ cao bị từ trượt (bánh xe bị trượt lết), người lái xe xử lý như thế nào để đảm bảo an toàn?",
    options: [
      "Đạp phanh gấp, giữ chặt tay lái",
      "Nhả bàn đạp ga, từ từ đạp phanh, đánh lái sang bên có mặt đường rộng",
      "Tăng ga mạnh",
      "Tắt máy ngay"
    ],
    correctIndex: 1
  },
  {
    id: 83,
    text: "Khi gặp biển báo 'Đường người đi bộ cắt ngang', người lái xe phải làm gì?",
    options: [
      "Giảm tốc độ, quan sát, nhường đường cho người đi bộ",
      "Tăng tốc qua nhanh",
      "Bấm còn liên tục",
      "Không cần chú ý"
    ],
    correctIndex: 0
  },
  {
    id: 84,
    text: "Người lái xe mô tô có được phép sử dụng điện thoại khi đang điều khiển xe không?",
    options: [
      "Được sử dụng nếu dùng tai nghe",
      "Không được sử dụng",
      "Chỉ gọi điện khẩn cấp",
      "Được dùng khi đường vắng"
    ],
    correctIndex: 1
  },
  {
    id: 85,
    text: "Khi gặp xe cứu hỏa đang đi làm nhiệm vụ, người lái xe phải làm gì?",
    options: [
      "Giữ nguyên tốc độ",
      "Nhanh chóng tránh về bên phải và dừng lại",
      "Tăng tốc vượt qua",
      "Đi tiếp nếu không cản trở"
    ],
    correctIndex: 1
  },
  {
    id: 86,
    text: "Vạch kẻ đường nào dưới đây phân tách hai chiều xe chạy (vạch tim đường)?",
    options: [
      "Vạch màu trắng nét đứt",
      "Vạch màu vàng nét đứt hoặc nét liền",
      "Vạch màu trắng nét liền đôi",
      "Vạch kẻ ngang màu trắng"
    ],
    correctIndex: 1
  },
  {
    id: 87,
    text: "Biển báo 'Cấm xe ô tô' có hiệu lực với loại xe nào?",
    options: [
      "Tất cả các loại ô tô",
      "Chỉ xe con",
      "Chỉ xe tải",
      "Xe mô tô"
    ],
    correctIndex: 0
  },
  {
    id: 88,
    text: "Khi điều khiển xe trên đường vòng, đường quanh co, người lái xe phải làm gì?",
    options: [
      "Giảm tốc độ, đi sát bên phải",
      "Tăng tốc đi nhanh",
      "Bấm còi liên tục",
      "Đi sát bên trái"
    ],
    correctIndex: 0
  },
  {
    id: 89,
    text: "Khi điều khiển xe qua khu vực trường học có biển báo, người lái xe phải xử lý như thế nào?",
    options: [
      "Giảm tốc độ, chú ý quan sát trẻ em",
      "Bấm còi liên tục",
      "Tăng tốc qua nhanh",
      "Dừng xe quan sát"
    ],
    correctIndex: 0
  },
  {
    id: 90,
    text: "Người lái xe không được lùi xe ở những khu vực nào?",
    options: [
      "Nơi cho phép lùi xe",
      "Trên cầu, đầu cầu, giao nhau, đường hẹp",
      "Bãi đỗ xe",
      "Đường một chiều"
    ],
    correctIndex: 1
  },
  {
    id: 91,
    text: "Biển báo 'Cấm dừng xe và đỗ xe' có hình thức như thế nào?",
    options: [
      "Hình tròn, viền đỏ, nền xanh, có chữ X đỏ",
      "Hình vuông",
      "Hình tam giác",
      "Hình chữ nhật"
    ],
    correctIndex: 0
  },
  {
    id: 92,
    text: "Khi tham gia giao thông, người lái xe phải mang theo loại bằng lái nào?",
    options: [
      "Bằng lái giả",
      "Bằng lái phù hợp với loại xe đang điều khiển",
      "Bất kỳ loại bằng nào",
      "Không cần bằng lái"
    ],
    correctIndex: 1
  },
  {
    id: 93,
    text: "Đèn tín hiệu giao thông màu vàng nhấp nháy có ý nghĩa gì?",
    options: [
      "Được đi nhưng phải giảm tốc độ, chú ý quan sát",
      "Phải dừng lại",
      "Tăng tốc qua nhanh",
      "Đi với tốc độ bình thường"
    ],
    correctIndex: 0
  },
  {
    id: 94,
    text: "Người lái xe phải xử lý như thế nào khi quan sát phía trước thấy người đi bộ đang sang đường?",
    options: [
      "Giảm tốc độ hoặc dừng lại để nhường đường",
      "Bấm còi để người đi bộ tránh",
      "Tăng tốc vượt qua",
      "Không cần chú ý"
    ],
    correctIndex: 0
  },
  {
    id: 95,
    text: "Biển báo hiệu lệnh có hình dạng và màu sắc như thế nào?",
    options: [
      "Hình tròn, nền xanh, viền trắng",
      "Hình tam giác, viền đỏ",
      "Hình tròn, viền đỏ",
      "Hình chữ nhật, nền xanh"
    ],
    correctIndex: 0
  },
  {
    id: 96,
    text: "Khi điều khiển xe xuống dốc dài, người lái xe số sàn cần thực hiện như thế nào?",
    options: [
      "Nhả hết ga, tắt máy, đạp phanh",
      "Giữ ga nhẹ, sử dụng phanh kết hợp với phanh động cơ",
      "Chỉ sử dụng phanh tay",
      "Tăng ga để xuống nhanh"
    ],
    correctIndex: 1
  },
  {
    id: 97,
    text: "Người điều khiển xe mô tô phải đội mũ bảo hiểm đúng quy cách khi nào?",
    options: [
      "Chỉ khi đi xa",
      "Khi tham gia giao thông đường bộ",
      "Chỉ khi thấy CSGT",
      "Tùy thích"
    ],
    correctIndex: 1
  },
  {
    id: 98,
    text: "Khi tham gia giao thông trên đường, người lái xe phải tuân thủ các quy tắc nào?",
    options: [
      "Chỉ cần chú ý xe phía trước",
      "Tuân thủ tất cả quy tắc giao thông",
      "Tùy tình huống",
      "Chỉ tuân thủ khi có cảnh sát"
    ],
    correctIndex: 1
  },
  {
    id: 99,
    text: "Khi điều khiển xe vào đường cao tốc, người lái xe phải bật đèn tín hiệu như thế nào?",
    options: [
      "Bật xi nhan trái",
      "Bật xi nhan phải",
      "Không cần bật",
      "Bật đèn pha"
    ],
    correctIndex: 0
  },
  {
    id: 100,
    text: "Người lái xe có được phép sử dụng ma túy, chất kích thích trước và trong khi lái xe không?",
    options: [
      "Được sử dụng ít",
      "Tuyệt đối không được phép",
      "Chỉ sử dụng khi mệt mỏi",
      "Được phép vào ban đêm"
    ],
    correctIndex: 1
  }
];

export const LEADERBOARD_DATA: Player[] = [
  { id: 1, name: "Nguyễn Văn A", score: 1550, badges: ["🏅 Không tai nạn", "🚦 Điều phối giỏi"] },
  { id: 2, name: "Trần Thị B", score: 1400, badges: ["🏅 Không tai nạn"] },
  { id: 3, name: "Lê Văn C", score: 1250, badges: ["🚦 Điều phối giỏi"] },
  { id: 4, name: "Phạm Minh D", score: 980, badges: [] },
  { id: 5, name: "Hoàng An", score: 850, badges: ["🏅 Không tai nạn"] }
];
