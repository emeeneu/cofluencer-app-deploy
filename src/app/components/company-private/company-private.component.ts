import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { ToasterService } from '../../services/toaster.service';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'app-company-private',
  templateUrl: './company-private.component.html',
  styleUrls: ['./company-private.component.css']
})
export class CompanyPrivateComponent implements OnInit {

  user: any;
  toggleMenu: boolean;
  toggleMoreButton: boolean;

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private toaster: ToasterService,
    private msg: MsgService,
  ) {
  }

  ngOnInit() {
    this.user = this.session.getUser();
    this.getCampaigns();
    this.companyService.checkFollowButton();
    this.msg.checkNotifications();
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

  campaignDetail(campaignId) {
    this.router.navigate(['company', this.user.username, campaignId]);
  }

}
