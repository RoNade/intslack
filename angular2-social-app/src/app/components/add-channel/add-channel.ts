import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Channel } from 'models';

import { ChannelService } from 'services';
import { ModalDirective } from 'ngx-bootstrap';

/**
 * Add a new channel in the list
 */
@Component({
    selector: 'add-channel',
    templateUrl: 'add-channel.html'
})
export class AddChannelComponent {
    @ViewChild(ModalDirective)
    modal: ModalDirective;
    @ViewChild(NgForm)
    ngForm: NgForm;

    model : any = {channel: ''};
    existingChannel : boolean = false;

    constructor(
        private channelService: ChannelService
    ) {}

    async save() {
        if (this.ngForm.valid) {
            try {
                const channels: Channel[] = await this.channelService.getAll();

                this.existingChannel = channels.some(channel => {
                    return channel.name === this.model.channel;
                });

                if(!this.existingChannel) {
                    await this.channelService.add(this.model.channel);
                    this.modal.hide();
                }
            }
            catch(err) {
                throw new Error(err);
            }
            
        }
    }
}