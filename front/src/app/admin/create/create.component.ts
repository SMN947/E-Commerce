import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { RequestsService } from '../../services/requests/requests.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  submitted = false;
  public req: Subscription;
  constructor(private router: Router, private request: RequestsService, private formBuilder: FormBuilder) { }
  productForm: FormGroup;
  ngOnInit(): void {
     this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      rating_rate: ['', Validators.required],
      rating_count: ['', Validators.required]
    });
  }
  
  submit(){
    console.log(this.productForm.value);
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this.req = this.request.createProduct(this.productForm.value).subscribe((res: any) => {
      console.log(res)
      this.router.navigate([`/product/${res.data}`]);
    }, err => {
      console.log("fail", err)
    });
    console.log(JSON.stringify(this.productForm.value, null, 2));
  }

  onReset() {
        this.submitted = false;
        this.productForm.reset();
    }
}
