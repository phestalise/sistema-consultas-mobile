import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  obterPacientes,
  salvarPacientes,
  salvarPacienteLogado,
  obterPacienteLogado,
} from "../services/storage";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg: "#F0F4F8",
  surface: "#FFFFFF",
  primary: "#1A6B72",       // deep teal
  primaryLight: "#2A9AA4",
  accent: "#E8F4F5",
  text: "#1C2B35",
  textMuted: "#6B8795",
  border: "#D4E4E8",
  borderFocus: "#1A6B72",
  danger: "#E05252",
  white: "#FFFFFF",
};

// ─── FLOATING LABEL INPUT ────────────────────────────────────────────────────
function FloatingInput({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "none",
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  keyboardType?: any;
  autoCapitalize?: any;
}) {
  const [focused, setFocused] = useState(false);
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const animate = (toValue: number) => {
    Animated.spring(anim, {
      toValue,
      useNativeDriver: false,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  useEffect(() => {
    animate(focused || value ? 1 : 0);
  }, [focused, value]);

  const labelTop = anim.interpolate({ inputRange: [0, 1], outputRange: [18, 6] });
  const labelSize = anim.interpolate({ inputRange: [0, 1], outputRange: [16, 11] });
  const labelColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [C.textMuted, focused ? C.primary : C.textMuted],
  });

  return (
    <View
      style={[
        s.inputWrap,
        focused && s.inputWrapFocused,
      ]}
    >
      <Animated.Text
        style={[s.floatLabel, { top: labelTop, fontSize: labelSize, color: labelColor }]}
      >
        {label}
      </Animated.Text>
      <TextInput
        style={s.floatInput}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────
export default function CadastroPaciente({ navigation }: any) {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [etapa, setEtapa] = useState<"cpf" | "cadastro">("cpf");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;

  // Animate on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: false }),
      Animated.spring(slideAnim, { toValue: 0, speed: 14, bounciness: 6, useNativeDriver: false }),
      Animated.timing(cardAnim, { toValue: 1, duration: 700, delay: 150, useNativeDriver: false }),
    ]).start();
  }, []);

  // Animate on step change
  const formFade = useRef(new Animated.Value(1)).current;
  const formSlide = useRef(new Animated.Value(0)).current;

  const switchEtapa = (next: "cpf" | "cadastro") => {
    Animated.parallel([
      Animated.timing(formFade, { toValue: 0, duration: 180, useNativeDriver: false }),
      Animated.timing(formSlide, { toValue: -12, duration: 180, useNativeDriver: false }),
    ]).start(() => {
      setEtapa(next);
      formSlide.setValue(12);
      Animated.parallel([
        Animated.timing(formFade, { toValue: 1, duration: 220, useNativeDriver: false }),
        Animated.spring(formSlide, { toValue: 0, speed: 18, bounciness: 4, useNativeDriver: false }),
      ]).start();
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const paciente = await obterPacienteLogado();
      if (paciente) { navigation.replace("Home"); return; }
      setCpf(""); setNome(""); setEmail(""); setTelefone("");
      setEtapa("cpf");
    });
    return unsubscribe;
  }, [navigation]);

  function limparCPF(v: string) { return v.replace(/\D/g, ""); }

  async function verificarCPF() {
    if (limparCPF(cpf).length !== 11) {
      Alert.alert("CPF inválido", "Digite os 11 dígitos do seu CPF.");
      return;
    }
    const pacientes = await obterPacientes();
    const encontrado = pacientes.find((p) => limparCPF(p.cpf) === limparCPF(cpf));
    if (encontrado) {
      await salvarPacienteLogado(encontrado);
      navigation.replace("Home");
    } else {
      switchEtapa("cadastro");
    }
  }

  async function cadastrar() {
    if (!nome || !email || limparCPF(cpf).length !== 11) {
      Alert.alert("Campos incompletos", "Preencha nome, email e CPF corretamente.");
      return;
    }
    const pacientes = await obterPacientes();
    const novo = { id: Date.now(), nome, cpf, email, telefone };
    await salvarPacientes([...pacientes, novo]);
    await salvarPacienteLogado(novo);
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  }

  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />

      {/* Background decoration */}
      <View style={s.bgCircle1} />
      <View style={s.bgCircle2} />

      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          style={[s.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <View style={s.logoMark}>
            <View style={s.logoInner} />
          </View>
          <Text style={s.appName}>Saúde+</Text>
          <Text style={s.tagline}>Cuidado que acompanha você</Text>
        </Animated.View>

        {/* Card */}
        <Animated.View
          style={[
            s.card,
            {
              opacity: cardAnim,
              transform: [
                {
                  translateY: cardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [32, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {/* Step indicator */}
          <View style={s.stepRow}>
            <View style={[s.stepDot, etapa === "cpf" && s.stepDotActive]} />
            <View style={s.stepLine} />
            <View style={[s.stepDot, etapa === "cadastro" && s.stepDotActive]} />
          </View>

          <Animated.View
            style={{ opacity: formFade, transform: [{ translateY: formSlide }] }}
          >
            <Text style={s.cardTitle}>
              {etapa === "cpf" ? "Bem-vindo" : "Novo cadastro"}
            </Text>
            <Text style={s.cardSub}>
              {etapa === "cpf"
                ? "Digite seu CPF para acessar"
                : "Complete seus dados para continuar"}
            </Text>

            <View style={s.fields}>
              <FloatingInput
                label="CPF"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
              />

              {etapa === "cadastro" && (
                <>
                  <FloatingInput
                    label="Nome completo"
                    value={nome}
                    onChangeText={setNome}
                    autoCapitalize="words"
                  />
                  <FloatingInput
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                  <FloatingInput
                    label="Telefone (opcional)"
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                  />
                </>
              )}
            </View>

            {etapa === "cpf" ? (
              <>
                <TouchableOpacity style={s.btnPrimary} onPress={verificarCPF} activeOpacity={0.85}>
                  <Text style={s.btnPrimaryText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={s.btnGhost}
                  onPress={() => switchEtapa("cadastro")}
                  activeOpacity={0.7}
                >
                  <Text style={s.btnGhostText}>Criar conta</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={s.btnPrimary} onPress={cadastrar} activeOpacity={0.85}>
                  <Text style={s.btnPrimaryText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => switchEtapa("cpf")}
                  activeOpacity={0.7}
                  style={s.backLink}
                >
                  <Text style={s.backLinkText}>← Voltar para login</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </Animated.View>

        <Text style={s.footer}>Seus dados estão protegidos</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  bgCircle1: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: C.primaryLight,
    opacity: 0.08,
    top: -80,
    right: -80,
  },
  bgCircle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: C.primary,
    opacity: 0.06,
    bottom: 60,
    left: -60,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  logoMark: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    // web-compatible shadow
    boxShadow: "0px 8px 16px rgba(26, 107, 114, 0.30)",
    elevation: 8,
  },
  logoInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 3,
    borderColor: C.white,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: C.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: C.textMuted,
    letterSpacing: 0.2,
  },

  // Card
  card: {
    backgroundColor: C.surface,
    borderRadius: 24,
    padding: 28,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.07)",
    elevation: 4,
    marginBottom: 20,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.border,
  },
  stepDotActive: {
    backgroundColor: C.primary,
    width: 24,
    borderRadius: 4,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: C.border,
    marginHorizontal: 6,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: C.text,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 14,
    color: C.textMuted,
    marginBottom: 24,
    lineHeight: 20,
  },

  // Fields
  fields: {
    gap: 12,
    marginBottom: 24,
  },
  inputWrap: {
    height: 60,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: C.bg,
    justifyContent: "flex-end",
  },
  inputWrapFocused: {
    borderColor: C.primary,
    backgroundColor: C.white,
  },
  floatLabel: {
    position: "absolute",
    left: 16,
    fontWeight: "500",
  },
  floatInput: {
    fontSize: 15,
    color: C.text,
    paddingBottom: 8,
    paddingTop: 20,
  },

  // Buttons
  btnPrimary: {
    backgroundColor: C.primary,
    borderRadius: 14,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    boxShadow: "0px 6px 12px rgba(26, 107, 114, 0.28)",
    elevation: 6,
  },
  btnPrimaryText: {
    color: C.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  btnGhost: {
    borderWidth: 1.5,
    borderColor: C.primary,
    borderRadius: 14,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  btnGhostText: {
    color: C.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  backLink: {
    alignItems: "center",
    paddingVertical: 8,
  },
  backLinkText: {
    color: C.textMuted,
    fontSize: 14,
    fontWeight: "500",
  },

  // Footer
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: C.textMuted,
    letterSpacing: 0.3,
  },
});