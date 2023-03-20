import { NgModule, ModuleWithProviders, NgZone, InjectionToken } from '@angular/core';
import { SignalR } from '../services/signalr';
import { SignalRConfiguration } from '../services/signalr.configuration';
import { hubConnection } from 'signalr-no-jquery';

const SIGNALR_CONFIGURATION = new InjectionToken<SignalRConfiguration>('SIGNALR_CONFIGURATION');

export function createSignalr(configuration: SignalRConfiguration, zone: NgZone) {
    return new SignalR(configuration, zone, hubConnection);
}

@NgModule({
    providers: [{
        provide: SignalR,
        useValue: SignalR
    }]
})
export class SignalRModule {
    public static forRoot(getSignalRConfiguration: () => void): ModuleWithProviders<SignalRModule> {
        return {
            ngModule: SignalRModule,
            providers: [
                {
                    provide: SIGNALR_CONFIGURATION,
                    useFactory: getSignalRConfiguration
                },
                {
                    deps: [SIGNALR_CONFIGURATION, NgZone],
                    provide: SignalR,
                    useFactory: (createSignalr)
                }
            ],
        };
    }
    public static forChild(): ModuleWithProviders<SignalRModule> {
        throw new Error('forChild method not implemented');
    }
}
