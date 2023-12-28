# API GP REMAKE

-   API LINK: https://api-gp-remake-production.up.railway.app/

## Overview

API này đóng vai trò là phần phụ trợ cho dự án tốt nghiệp đợt 2

### USER - Người dùng

-   Đăng ký - chỉ dành cho Quarn lys

```http
  POST /user/register
```

| Body                                                 | Type     | Description   |
| :--------------------------------------------------- | :------- | :------------ |
| `name`                                               | `string` | **Required**. |
| `email`                                              | `string` | **Required**. |
| `role`                                               | `string` | **Required**. |
| Nếu `role` có giá trị là là `Nhân viên` thì có thêm: |
| `job`                                                | `string` | **Required**. |

-   Đăng nhập

```http
  POST /user/login
```

| Body       | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

-   Đăng xuất

```http
  GET /user/logout/${id} = session id login
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

-   Cập nhập người dùng

```http
  PUT /user/update/${id} = id của người dùng
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

| Body                  | Type      | Description       |
| :-------------------- | :-------- | :---------------- |
| `name`                | `string`  | **Not required**. |
| `email`               | `string`  | **Not required**. |
| `address`             | `string`  | **Not required**. |
| `phone`               | `string`  | **Not required**. |
| `birthday`            | `string`  | **Not required**. |
| `citizenIdentityCard` | `string`  | **Not required**. |
| `gender`              | `string`  | **Not required**. |
| `role`                | `string`  | **Not required**. |
| `role`                | `string`  | **Not required**. |
| `avatar`              | `Blob`    | **Not required**. |
| `status`              | `Boolean` | **Not required**. |

-   Đổi mật khẩu

```http
  PUT /user/change-password/${id} = id của người dùng
```

| Body          | Type     | Description   |
| :------------ | :------- | :------------ |
| `oldpassword` | `string` | **Required**. |
| `password`    | `string` | **Required**. |

-   Quên mật khẩu

```http
  GET /user/forgot-password
```

| QUERY   | Type     | Description   |
| :------ | :------- | :------------ |
| `email` | `string` | **Required**. |

-   Verify Email

```http
  POST /user/verify-confirmation-code
```

| Body               | Type     | Description                              |
| :----------------- | :------- | :--------------------------------------- |
| `email`            | `string` | **Required**. email ở phần quên mật khẩu |
| `confirmationCode` | `string` | **Required**. mã xác thực ở trong mail   |

-   Verify Email

```http
  PUT /user/reset-password
```

| Body          | Type     | Description                              |
| :------------ | :------- | :--------------------------------------- |
| `email`       | `string` | **Required**. email ở phần quên mật khẩu |
| `newPassword` | `string` | **Required**. Mật khẩu mới               |

-   Xoá người dùng

```http
  DELETE /user/delete/${id} = id của người dùng
```

-   Gọi danh sách người dùng

```http
  GET /user/list
```

-   Thêm lương cho người dùng

```http
  POST /user/salary/:id
```

| Body     | Type     | Description   |
| :------- | :------- | :------------ |
| `year`   | `string` | **Required**. |
| `month`  | `string` | **Required**. |
| `salary` | `number` | **Required**. |
| `bonus`  | `number` | **Required**. |

-   Gọi danh sách lương người dùng

```http
  GET /user/salary/:id
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

| QUERY   | Type     | Description       |
| :------ | :------- | :---------------- |
| `year`  | `string` | **Not required**. |
| `month` | `string` | **Not required**. |

-   Cập nhập lương người dùng

```http
  PUT /user/salary/:id
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

| QUERY   | Type     | Description   |
| :------ | :------- | :------------ |
| `year`  | `string` | **Required**. |
| `month` | `string` | **Required**. |

| Body     | Type     | Description   |
| :------- | :------- | :------------ |
| `salary` | `number` | **Required**. |
| `bonus`  | `number` | **Required**. |

-   Xoá lương người dùng

```http
  DELETE /user/salary/:id
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

| QUERY   | Type     | Description   |
| :------ | :------- | :------------ |
| `year`  | `string` | **Required**. |
| `month` | `string` | **Required**. |

### CLIENT - Khách hàng

-   Thêm khách hàng mới

```http
  POST /client/create
```

| Body        | Type     | Description   |
| :---------- | :------- | :------------ |
| `name`      | `string` | **Required**. |
| `address`   | `string` | **Required**. |
| `phone`     | `string` | **Required**. |
| `gender`    | `string` | **Required**. |
| `creatorID` | `number` | **Required**. |

-   Gọi danh sách khách hàng

```http
  GET /client/list
```

-   Gọi chi tiết khách hàng

```http
  GET /client/detail/${id} = id của khách hàng
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

-   Cập nhập khách hàng

```http
  PUT /client/update/${id} = id của khách hàng
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

| Body      | Type     | Description   |
| :-------- | :------- | :------------ |
| `name`    | `string` | **Required**. |
| `address` | `string` | **Required**. |
| `phone`   | `string` | **Required**. |
| `gender`  | `string` | **Required**. |

-   Xoá khách hàng

```http
  DELETE /client/delete/${id} = id của khách hàng
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

### SERVICE - Dịch vụ

-   Tạo dịch vụ

```http
  POST /service/create
```

| Body          | Type     | Description   |
| :------------ | :------- | :------------ |
| `name`        | `string` | **Required**. |
| `description` | `string` | **Required**. |
| `price`       | `string` | **Required**. |
| `image`       | `Blob`   | **Required**. |

-   Cập nhập dịch vụ

```http
  PUT /service/update/:id = `id` của dịch vụ
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

| Body          | Type     | Description       |
| :------------ | :------- | :---------------- |
| `name`        | `string` | **Not required**. |
| `description` | `string` | **Not required**. |
| `price`       | `string` | **Not required**. |
| `image`       | `Blob`   | **Not required**. |

-   Xoá dịch vụ

```http
  DELETE /service/delete/:id = `id` của dịch vụ
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

-   Danh sách dịch vụ

```http
  GET /service/list/:id = `id` của dịch vụ
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

-   Chi tiết dịch vụ

```http
  GET /service/detail/:id = `id` của dịch vụ
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

### Wedding Outfit - Áo cưới

-   Thêm áo cưới

```http
  POST /WeddingOutfit/create
```

| Body          | Type     | Description   |
| :------------ | :------- | :------------ |
| `name`        | `string` | **Required**. |
| `description` | `string` | **Required**. |
| `size`        | `string` | **Required**. |
| `price`       | `string` | **Required**. |
| `color`       | `string` | **Required**. |
| `image`       | `Blob`   | **Required**. |

-   Cập nhập Áo cưới

```http
  PUT /WeddingOutfit/update/:id = `id` của Áo cưới
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

| Body          | Type     | Description        |
| :------------ | :------- | :----------------- |
| `name`        | `string` | **Not required**.. |
| `description` | `string` | **Not required**.. |
| `size`        | `string` | **Not required**.. |
| `price`       | `string` | **Not required**.. |
| `color`       | `string` | **Not required**.. |
| `image`       | `Blob`   | **Not required**.. |
| `status`      | `Blob`   | **Not required**.  |

-   Xoá Áo cưới

```http
  DELETE /WeddingOutfit/delete/:id = `id` của Áo cưới
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

-   Danh sách Áo cưới

```http
  GET /WeddingOutfit/list/
```

-   Chi tiết Áo cưới

```http
  GET /WeddingOutfit/detail/:id = `id` của Áo cưới
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

### Contract - Hợp đồng

-   Tạo hợp đồng

```http
  POST /contract/create
```

| Body              | Type     | Description       |
| :---------------- | :------- | :---------------- |
| `userId`          | `string` | **Required**.     |
| `clientId`        | `string` | **Required**.     |
| `services`        | `string` | **Required**.     |
| `weddingOutfit`   | `string` | **Required**.     |
| `note`            | `string` | **Required**.     |
| `workDate`        | `string` | **Required**.     |
| `deliveryDate`    | `string` | **Required**.     |
| `location`        | `string` | **Required**.     |
| `prepayment`      | `string` | **Not required**. |
| `additionalCosts` | `string` | **Not required**. |
| `priceTotal`      | `string` | **Required**.     |

| services    | Type     | Description   |
| :---------- | :------- | :------------ |
| `userId`    | `string` | **Required**. |
| `serviceId` | `string` | **Required**. |

| weddingOutfit     | Type     | Description   |
| :---------------- | :------- | :------------ |
| `userId`          | `string` | **Required**. |
| `weddingOutfitId` | `string` | **Required**. |
| `rentalDate`      | `DATE`   | **Required**. |
| `returnDate`      | `DATE`   | **Required**. |
| `description`     | `string` | **Required**. |

| additionalCosts | Type     | Description   |
| :-------------- | :------- | :------------ |
| `description`   | `string` | **Required**. |
| `price`         | `string` | **Required**. |

-   Danh sách hợp đồng

```http
  GET /contract/list/
```

-   Danh sách hợp đồng theo người dùng

```http
  GET /contract/list/:id
```

| Params   | Type     | Description   |
| :------- | :------- | :------------ |
| `userID` | `string` | **Required**. |

-   Chi tiết hợp đồng

```http
  GET /contract/detail/:id
```

| Params        | Type     | Description   |
| :------------ | :------- | :------------ |
| `contract ID` | `string` | **Required**. |

-   Xoá hợp đồng

```http
  GET /contract/delete/:id
```

| Params        | Type     | Description   |
| :------------ | :------- | :------------ |
| `contract ID` | `string` | **Required**. |

### Work - Công việc

-   Thêm loại công việc

```http
  POST /work/create
```

| BODY   | Type     | Description        |
| :----- | :------- | :----------------- |
| `name` | `string` | Tên loại công việc |

-   Danh sách loại công việc

```http
  GET /work/list
```

-   Sửa loại công việc

```http
  PUT /work/update/:id

| PARAMS | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | Id loại công việc muốn sửa |
```

| BODY   | Type     | Description        |
| :----- | :------- | :----------------- |
| `name` | `string` | Tên loại công việc |

-   Xoá loại công việc

```http
  DELETE /work/delete/:id
```

| PARAMS | Type     | Description                |
| :----- | :------- | :------------------------- |
| `id`   | `string` | Id loại công việc muốn xoá |

-   Thêm công việc cho nhân viên

```http
  POST /work/add-work
```

| BODY          | Type     | Description       |
| :------------ | :------- | :---------------- |
| `workType_ID` | `string` | Id loại công việc |
| `user_ID`     | `string` | Id nhân viên      |
| `workDate`    | `string` | Ngày làm việc     |
| `address`     | `string` | Địa chỉ           |
| `note`        | `string` | Ghi chú           |

-   Danh sách công việc của tất cả nhân viên

```http
  GET /work/list-work
```

-   Danh sách công việc của nhân viên

```http
  GET /work/user-work/:id?date=DD/MM/YYYY
```

| PARAMS | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | Id nhân viên |

| QUERY  | Type   | Description                          |
| :----- | :----- | :----------------------------------- |
| `date` | `DATE` | Ẩn nêu muốn hiển thị tất cả ngày làm |

-   Danh sách nhân viên có thể thêm công việc trong này

```http
  GET /work/list-user-add-work?date=DD/MM/YYYY
```

| QUERY  | Type   | Description                 |
| :----- | :----- | :-------------------------- |
| `date` | `DATE` | Ẩn nêu muốn hiển thị tất cả |

-   Chi tiết công việc

```http
  GET /work/detail-work/:id
```

| PARAMS | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | Id công việc |

-   Sửa công việc

```http
  PUT /work/update-work/:id
```

| PARAMS | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | Id công việc |

| BODY          | Type     | Description       |
| :------------ | :------- | :---------------- |
| `workType_ID` | `string` | Id loại công việc |
| `user_ID`     | `string` | Id nhân viên      |
| `workDate`    | `string` | Ngày làm          |
| `address`     | `string` | Địa chỉ           |
| `note`        | `string` | Ghi chú           |

-   Xoá công việc

```http
  DELETE /work/delete-work/:id
```
| PARAMS | Type     | Description  |
| :----- | :------- | :----------- |
| `id`   | `string` | Id công việc |