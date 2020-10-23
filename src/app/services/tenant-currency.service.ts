import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class TenantCurrencyService {
    constructor(private http: HttpClient) { }

    getAllCurrencies() {
        return this.http.get('http://localhost:8000/Currency/V1/currency')
            .pipe(map((res: any) => res));
    }

    getTenantCurrency(tenantId) {
        return this.http.get(`http://localhost:8000/Currency/V1/currency/${tenantId}`)
            .pipe(map((res: any) => res));
    }

    addCurrency(code, name, tenantId, check) {
        var formData: any = new FormData();
        formData.append('Id', 0);
        formData.append('code', code);
        formData.append('Name', name);
        formData.append('tenantId', tenantId);
        formData.append('isDefaultCurrency', check);

        return this.http.post(`http://localhost:8000/Currency/V1/currency`, formData)
            .pipe(map((res: any) => res));
    }

    deleteCurrency(currencyId) {
        console.log('sve:' + currencyId);
        return this.http.delete(`http://localhost:8000/Currency/V1/currency/${currencyId}`)
            .pipe(map((res: any) => res));
    }

    addSelectedCurrency(customerId, defaultCurrencyId, selectedArray) {
        console.log(customerId, defaultCurrencyId, selectedArray);
        return this.http.post(`http://localhost:8000/Currency/V1/currency/SetCurrencies/${customerId}?defaultCurrencyId=${defaultCurrencyId}`, selectedArray)
            .pipe(map((res: any) => res));
    }

    changeDefaultCurrency(tenantId, currencyId) {
        console.log('sve:' + tenantId, currencyId);
        return this.http.post(`http://localhost:8000/Currency/V1/currency/${tenantId}/${currencyId}`, undefined)
            .pipe(map((res: any) => res));
    }

}

// addTenantCurrency(tenantId, code) {
//     var formData: any = new FormData();
//     formData.append("currencyCode", code);
//     console.log(formData);
//     return this.http.post(`http://localhost:8000/Currency/V1/currency/${tenantId}`, { currencyCode: code })
//         .pipe(
//             map((res: any) => res)
//         )
// }

// submitForm() {
//     var formData: any = new FormData();
//     formData.append("name", this.form.get('name').value);
//     formData.append("avatar", this.form.get('avatar').value);
//     this.http.post('http://localhost:4000/api/create-user', formData).subscribe(
//         (response) => console.log(response),
//         (error) => console.log(error)
//     )
// }

// addTenantCurrency(tenantId, code) {
//     const httpOptions = {
//         headers: new HttpHeaders({
//             'Content-Type': 'application/json'
//         })
//     };
//     return this.http
//         .post(`http://localhost:8000/Currency/V1/currency/${tenantId}`, { currencyCode: code }, httpOptions)
//         .pipe(
//             map((res: any) => res)
//         )
// }