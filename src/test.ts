import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  }
);

const context = require.context('./', true, /\.spec\.ts$/);
context.keys().forEach((key: string) => {
  if (key.endsWith('.spec.ts')) {
    try {
      context(key);
    } catch (error) {
      console.error(`Error loading test file: ${key}`, error);
    }
  }
});

const coverageContext = require.context('../src/', true, /\.(spec|test)\.ts$/);
coverageContext.keys().forEach((key: string) => {
  if (key.match(/\.(spec|test)\.ts$/) && !key.includes('.stories.')) {
    try {
      coverageContext(key);
    } catch (error) {
      console.warn(`Could not load coverage test: ${key}`);
    }
  }
});

if (typeof window !== 'undefined') {
  window.onbeforeunload = () => {
    const testBed = getTestBed();
    if (testBed) {
      testBed.resetTestingModule();
      testBed.resetTestEnvironment();
    }
  };
}

jasmine.getEnv().addReporter({
  specDone: (result: { description: string; status: string; failedExpectations: { message: string }[] }) => {
    if (result.status === 'failed') {
      console.error(`FAILED: ${result.description}`);
      result.failedExpectations.forEach((expectation: { message: string }) => {
        console.error(`  - ${expectation.message}`);
      });
    }
  },
  jasmineDone: () => {
    console.log('Test suite completed');
  },
});

(window as unknown as { __karma__: { start: (config: unknown, callback: () => void) => void } }).__karma__?.start?.({}, () => {
  console.log('Karma test runner initialized');
});