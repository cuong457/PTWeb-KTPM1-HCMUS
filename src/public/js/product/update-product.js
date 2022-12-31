document.addEventListener("DOMContentLoaded", function() {
    
});

const submitBtn = document.querySelector(".btn-submit-create-prod");

submitBtn.addEventListener("click", function(e) {
    ///e.preventDefault();

    console.log("submited");
})

// ======================================================

const createProductForm = document.querySelector(".form-create-product");

const productSettings = async function (data, type) {
    const url =
        type === 'update'
        ? '/admin/products/create'
        : '/admin/products/create';
    
    try {
        let fetchOptions = {
            method: 'POST',
            body: data
        };

        if (type === 'update') {
            // fetchOptions = { 
            //     method: 'PATCH',
            //     body: JSON.stringify(data),
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // }
        };

        //console.log(data);
        
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            const errRes = await response.json();
            alert(errRes.message);
            return false;
        }

        const resData = await response.json();
        alert(`Product ${type} successfully`);
        return true;
    } catch (err) {
        alert('error', err.message);
        return false;
    }
};

if (createProductForm) {
    const handleCreateProduct = async function(e) {
        e.preventDefault();

        const formData = new FormData();
        const nameInput = this.elements[(name = "name")];
        const priceInput = this.elements[(name = "price")];
        const manufacturerInput = this.elements[(name = "manufacturer")];
        const stockInput = this.elements[(name = "stock")];
        // const suspendedInput = this.elements[(name = "suspended")];
        const descriptionInput = this.elements[(name = "description")];
        

        // wait
        // const photo = this.elements[(name = "name")];
        // const category = this.elements[(name = "category")];
        
        formData.append("name", nameInput.value)
        formData.append("price", priceInput.value);
        formData.append("manufacturer", manufacturerInput.value);
        formData.append("stock", stockInput.value);
        // createProdFormData.append("suspended", suspendedInput);
        formData.append("description", descriptionInput.value);

        console.log('vcl ', formData.get("price"));

        productSettings(formData, 'create');
    };

    createProductForm.addEventListener("submit", handleCreateProduct);
}