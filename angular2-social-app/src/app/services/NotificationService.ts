import { Injectable } from '@angular/core';
import { Notification } from 'models';

@Injectable()
export class NotificationService {
    activity: Array<Notification> = [];

    getAll(): Array<Notification> {
        return this.activity;
    }

    add(notification: Notification): Array<Notification> {
        this.activity.push(notification);
        return this.activity;
    }
}