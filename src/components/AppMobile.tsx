import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import mobileAppHero from "@/assets/mobile-app-hero.jpg";

const AppMobile = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wider border border-primary px-3 py-1 inline-block rounded-md">
                Mobile App
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Learn on the{" "}
                <span className="text-primary">go</span> with our mobile app
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Take your learning experience anywhere. Download our mobile app for iOS and Android 
                to access courses, track progress, and continue learning even when you're offline.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">Offline Learning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">Progress Sync</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">Push Notifications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">Mobile Optimized</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* App Store Button - Dark Theme */}
              <a
                href="#"
                className="flex items-center w-[200px] h-[56px] px-4 py-3 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <img
                  src="/app-store-icons/apple-store.svg"
                  alt="App Store"
                  className="w-8 h-8 mr-4 filter brightness-0 invert"
                />
                <div className="text-left leading-none">
                  <p className="text-xs font-medium text-background/70">Download on the</p>
                  <p className="text-base font-semibold text-background">
                    App Store
                  </p>
                </div>
              </a>

              {/* Google Play Button - Light Theme */}
              <a
                href="#"
                className="flex items-center w-[200px] h-[56px] px-4 py-3 rounded-xl border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <img
                  src="/app-store-icons/google-play.svg"
                  alt="Google Play"
                  className="w-8 h-8 mr-4"
                />
                <div className="text-left leading-none">
                  <p className="text-xs font-medium text-muted-foreground">GET IT ON</p>
                  <p className="text-base font-semibold text-foreground">
                    Google Play
                  </p>
                </div>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-muted-foreground">App Store Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100K+</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img
                src={mobileAppHero}
                alt="Mobile app interface showing learning platform"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                New Update Available!
              </motion.div>
              
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-4 bg-background border border-border px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                📱 Available on all devices
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppMobile;