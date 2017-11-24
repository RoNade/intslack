import { Channel } from 'models';
import { ChannelService } from 'services';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { PostSocketService } from '../../services/PostSocketService';

/**
 * Main component. Display the channel list, the social feed and the notification bar for logged users.
 */
@Component({
    selector: 'social-app',
    templateUrl: 'social-app.html'
})
export class SocialAppComponent implements OnInit {
    channels: Channel[] = [];
    
    constructor(
        private channelService: ChannelService,
        private socket: PostSocketService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    async ngOnInit() { 
        // get the channels with the channelService
        try {
            this.channels = await this.channelService.getAll();
            const firstChannelId = this.channels[0].id;

            this.socket.onNewChannel(channel => {
                this.channels.push(channel);
            });

            if(this.route.firstChild === null) {
                this.router.navigate([`/channel/${firstChannelId}`]);
            }
        }
        catch(err) {
            throw new Error(err);
        }
    }
}
