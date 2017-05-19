package com.tcp;

import android.app.Application;

import com.elvishew.xlog.LogLevel;
import com.elvishew.xlog.XLog;
import com.facebook.react.ReactApplication;
import com.flurry.android.FlurryAgent;
import com.mehcode.reactnative.splashscreen.SplashScreenPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.microsoft.codepush.react.CodePush;
import com.tcp.nativeExtention.ANativePackage;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new SplashScreenPackage(),
              new CodePush("OESoJepwvYUVO5JLX51iJl3LHucn4ksvOXqog", MainApplication.this, BuildConfig.DEBUG,"http://104.250.145.227:3000"),
              new ANativePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    new FlurryAgent.Builder()
            .withLogEnabled(true)
            .build(this, "X57HZCBG8MWMGDV2XQMN");
    XLog.init(LogLevel.ALL);
    SoLoader.init(this, false);
  }
}
