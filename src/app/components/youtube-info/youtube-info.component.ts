import { Component, OnInit } from '@angular/core';
import { YoutubeDatauserService } from '../../services/youtube-datauser.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-youtube-info',
  templateUrl: './youtube-info.component.html',
  styleUrls: ['./youtube-info.component.css']
})
export class YoutubeInfoComponent implements OnInit {

  user: any;
  rolControl: Boolean = false;
  youtubeInfo: any;
  accountInput: Boolean = false;
  accountAddId: any = '';

  constructor(
    private userYoutubeInfo: YoutubeDatauserService,
    private sanitizer: DomSanitizer,
    private session: AuthService,
    private companyService: CompanyService,
    ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.user.role === 'influencer' ? this.rolControl = true : this.rolControl = false;
    if (this.rolControl) {
    this.youtubeInfo = this.session.getUser().socialLinks.youtube;
    } else if (!this.rolControl){
      if (this.companyService.influencer.socialLinks.youtube !== ''){
        this.youtubeInfo = this.companyService.influencer.socialLinks.youtube;
      }
    }
    if (this.youtubeInfo) {
      this.userYoutubeInfo.getInfoYoutubeUser(this.youtubeInfo);
    }
  }

  cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

  toggleAccount() {
    this.accountInput = !this.accountInput;
  }

  saveAccount() {
    this.userYoutubeInfo.getInfoYoutubeUser(this.accountAddId)
    .then((res) => {
      if (res !== 'err') {
        this.userYoutubeInfo.addChannelId(this.accountAddId);
        this.youtubeInfo = this.accountAddId;
      } else {
        this.toggleAccount();
      }
    });
  }

}
