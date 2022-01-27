import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { RequestsService } from '../../services/requests/requests.service'
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  submitted = false;
  productForm: FormGroup;
  id: number = 0;
  public req: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private request: RequestsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      rating_rate: ['', Validators.required],
      rating_count: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.req = this.request.getProduct(this.id).subscribe((res: any) => {
      console.log(res)
      this.productForm.setValue(res[0])
    }, err => {
      console.log("fail", err)
    });
  }

  
  submit(){
    console.log(this.productForm.value);
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this.req = this.request.updateProduct(this.productForm.value).subscribe((res: any) => {
      console.log(res)
      this.router.navigate([`/product/${this.id}`]);
    }, err => {
      console.log("fail", err)
    });
    console.log(JSON.stringify(ActivatedRoute, null, 2));
  }

  onReset() {
        this.submitted = false;
        this.productForm.reset();
    }

}
