import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { ToasterService } from '../../services/toaster.service';
import { InfluencerService } from '../../services/influencer.service';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'app-company-public',
  templateUrl: './company-public.component.html',
  styleUrls: ['./company-public.component.css']
})
export class CompanyPublicComponent implements OnInit {

  user: any;
  toggleMenu: boolean;
  toggleMoreButton: boolean;
  companyParams: any;
  campaignId: any;
  private sub: any;

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private toaster: ToasterService,
    private influencer: InfluencerService,
    private msg: MsgService,
  ) {
  }

  ngOnInit() {
    this.user = this.session.getUser();
    this.sub = this.route.params.subscribe(params => {
      this.companyParams = params['id'];
    });
    this.influencer.getCompany(this.companyParams);
    this.companyService.campaignByCompany(this.companyParams);
    this.msg.checkNotifications();
    this.influencer.checkFollowButton();
  }

  logout() {
    this.session.logout();
    this.router.navigate(['/']);
    this.toaster.info(`See you soon ${this.user.username}`);
  }

  menuControl() {
    this.toggleMenu = !this.toggleMenu;
  }

  moreButtonControl() {
    this.toggleMoreButton = !this.toggleMoreButton;
  }

  getCampaigns() {
    this.companyService.campaignsList();
  }

  newCampaign() {
    this.router.navigate(['company', this.user.username, 'new-campaign']);
  }

  editProfile() {
    this.router.navigate(['company', this.user.username, 'edit-profile']);
  }

  campaignDetail() {
    this.router.navigate(['company', this.influencer.companyDetail.username, this.influencer.companyDetail._id]);
  }

}
