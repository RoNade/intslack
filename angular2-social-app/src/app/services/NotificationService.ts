import { Injectable } from '@angular/core';
import { Notification } from 'models';

@Injectable()
export class NotificationService {
    key = "$activity";

    getAll(): Array<any> {
        const result = localStorage.getItem(this.key);
        return JSON.parse(result) || [];
    }

    add(notification: Notification): Array<Notification> {
        let activity = JSON.parse(localStorage.getItem(this.key));
        if(!Array.isArray(activity)) activity = [];
        activity.push(notification);

        localStorage.setItem(this.key, JSON.stringify(activity));
        return activity;
    }

    clean(): void{
        localStorage.removeItem(this.key);
    }
}