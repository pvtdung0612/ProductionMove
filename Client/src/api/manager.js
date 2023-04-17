import axios from "axios";

const DEFAULT_TIMEOUT = 10000;

axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: DEFAULT_TIMEOUT,
});
//Session
export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/login", { username, password })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const logout = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/logout")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//DELLCORG
export const getItems = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/dell-corp/product-management")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getItemsType = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/dell-corp/productline-management")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAccounts = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/dell-corp/account-management")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateItemType = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/dell-corp/productline-management/update", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addItemType = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/dell-corp/productline-management/create", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteItemType = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/dell-corp/productline-management/delete", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addAccount = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/dell-corp/account-management/create", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateAccount = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/dell-corp/account-management/update", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteAccount = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/dell-corp/account-management/delete", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addItem = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("items-type/add", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateItem = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("items-type/update", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteItem = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("items-type/delete", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Extension
//Lấy các dòng sản phẩm
export const getAllProductLine = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/extension/get-all-productline")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Lấy các đại lý
export const getAllAgent = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/extension/get-all-agent")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//FACTORY
export const getAllFactory = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/factory/product-management")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Thêm lô hàng
export const addBatches = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/factory/product-management/enter-batches", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Thêm lô hàng
export const deleteProduct = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/factory/product-management/delete", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Gửi cho đại lý
export const sendAgent = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/factory/product-management/export-to-agent", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Báo cáo về lỗi
export const getErrorReport = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/factory/error-management")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getErrorInfo = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/factory/defective-product-management")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Nhận sản phẩm từ ttbh
export const receiveErrorProduct = (id) => {
  const payload = {
    productID: id,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(
        "/api/factory/defective-product-management/receive-product",
        payload
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Báo cáo bán hàng
export const getSellManager = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/factory/get-sell")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//AGENT API
export const getAgentProduct = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/product-management")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Lấy danh mục sản phẩm bên factory
export const getProductFactory = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/product-management/enter-from-factory/get-product")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Gửi id product để factory gửi sp
export const getFromFactory = (ids) => {
  const payload = {
    products: ids.map((value) => ({ id: value })),
  };
  return new Promise((resolve, reject) => {
    axios
      .post("/api/product-management/enter-from-factory", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Danh sách khách hàng
export const getCustomers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/product-management/sell-for-customer/get-customer")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Bán khách hàng
export const sellProduct = (customerID, productID) => {
  const payload = { productID: productID, customerID: customerID };
  return new Promise((resolve, reject) => {
    axios
      .post("/api/product-management/sell-for-customer", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Report error
export const reporterror = (productID) => {
  const payload = { productID: productID };
  return new Promise((resolve, reject) => {
    axios
      .post("/api/product-management/report-error", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Report error send mail
export const sendMail = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/product-management/report-error/send-mail", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Thông tin sản phẩm bảo hành
export const getInsuranceManagement = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/insurance-management")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Thông tin trung tâm bảo hành
export const getInsuranceCenter = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "/api/insurance-management/send-insurance-center/get-all-insurance-center"
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Gửi cho TTBH
export const sendInsuranceCenter = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/insurance-management/send-insurance-center", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Gửi sp sau bảo hành cho khách hàng
export const sendInsuranceCustomer = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "/api/insurance-management/send-insurance-success-customer",
        payload
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Nhận lại sản phẩm từ khách hàng
export const receiveProductFromCustomer = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/product-management/get-insurance", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Nhận sản phẩm từ ttbh
export const receiveProductFromInsurance = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/insurance-management/receive-insurance-success", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Nhận sản phẩm từ ttbh
export const sendMailError = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "/api/insurance-management/send-insurance-fail-factory/send-mail",
        payload
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Gửi trả lại cơ sở sản xuất
export const sendBackFactory = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/insurance-management/send-insurance-fail-factory", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Danh sách khách hàng
export const getCustomerManager = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/customer-management")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Thêm khách hàng mới
export const addCustomer = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/customer-management/create", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Sửa thông tin khách hàng
export const editCustomer = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/customer-management/update", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Xóa thông tin khách hàng
export const deleteCustomer = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/customer-management/delete", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Báo cáo bán hàng
export const getSellReport = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/agent/get-sell")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Insurance Center
export const getInsuranceManager = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/insurance/insurance-management")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Insurance Center
export const receiveFromAgent = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "/api/insurance/insurance-management/receive-insurance-agent",
        payload
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Thông tin bảo hành
export const finishInsurance = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/insurance/insurance-management/finish-insurance", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Gửi lại từ ttbh cho nhà máy
export const sendInsuranceFactory = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/insurance/insurance-management/send-factory", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Gửi cho đại lý
export const sendInsuranceAgent = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/insurance/insurance-management/send-agent", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Gửi cho đại lý
export const reportFactory = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/insurance/insurance-management/report-factory", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
