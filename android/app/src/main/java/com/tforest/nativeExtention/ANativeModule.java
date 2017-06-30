package com.tcp.nativeExtention;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.elvishew.xlog.XLog;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.flurry.android.FlurryAgent;
import com.microsoft.codepush.react.CodePush;
import com.tcp.MainActivity;
import com.tcp.MainApplication;

import org.json.JSONStringer;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class ANativeModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public ANativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ANativeModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }


    @ReactMethod
    public void logClass(String tag, String msg) {
        // XLog.tag(tag).b().d(msg);
        XLog.tag(tag).d(msg);
    }

    @ReactMethod
    public void analysis(String message) {
        FlurryAgent.logEvent(message);
    }

    @ReactMethod
    public void restartApp() {
        Context  context=MainApplication.myCodePush.getContext();
        Intent mStartActivity = new Intent(context, MainActivity.class);
        int mPendingIntentId = 123456;
        PendingIntent mPendingIntent = PendingIntent.getActivity(context, mPendingIntentId,    mStartActivity, PendingIntent.FLAG_CANCEL_CURRENT);
        AlarmManager mgr = (AlarmManager)context.getSystemService(Context.ALARM_SERVICE);
        mgr.set(AlarmManager.RTC, System.currentTimeMillis() + 10, mPendingIntent);
        System.exit(0);
    }

    @ReactMethod
    public void codePushServer(String serverName, Callback callback) {
        if(MainApplication.myCodePush!=null)
        {
            MainApplication.myCodePush.setServerUrl(serverName);
            XLog.tag("thomas").d("MainApplication.myCodePush------------"+serverName);
            callback.invoke(null, "ok");
        }
    }


    @ReactMethod
    public void analysisWithObj(String message, ReadableMap map) {
        Map<String, String> articleParams = new HashMap<>();
        ReadableMapKeySetIterator keyIterator = map.keySetIterator();
        while (keyIterator.hasNextKey()) {
            String key = keyIterator.nextKey();
            switch (map.getType(key)) {
                case Null:
                    break;
                case Boolean:
                    articleParams.put(key, String.valueOf(map.getBoolean(key)));
                    break;
                case Number:
                    articleParams.put(key, String.valueOf(map.getDouble(key)));
                    break;
                case String:
                    articleParams.put(key, map.getString(key));
                    break;
                case Map:
                    articleParams.put(key, "map");
                    break;
                case Array:
                    articleParams.put(key, "array");
                    break;
                default:
                    articleParams.put(key, "null");
                    break;
            }
        }

        FlurryAgent.logEvent(message, articleParams);
    }


    public static String transMapToString(Map map) {
        Map.Entry entry;
        StringBuffer sb = new StringBuffer();
        for (Iterator iterator = map.entrySet().iterator(); iterator.hasNext(); ) {
            entry = (Map.Entry) iterator.next();
            sb.append(entry.getKey().toString()).append("'").append(null == entry.getValue() ? "" :
                    entry.getValue().toString()).append(iterator.hasNext() ? "^" : "");
        }
        return sb.toString();
    }



}


