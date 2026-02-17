import { Category, Priority } from "../types/types";

// Keyword fallback logic to categorize tickets based on content
const keywordFallback = (text: string): { category: Category; priority: Priority } => {
  const lower = text.toLowerCase();
  
  // 1. BILLING
  // Keywords: invoice, bill, charge, payment, refund, subscription, cost, fee
  if (/(invoice|bill|charge|payment|refund|subscription|credit card|pricing|plan|receipt|cost|fee|upgrade|downgrade)/.test(lower)) {
    // High Priority Billing: Wrong charges, double charges, payment failures
    if (/(wrong|incorrect|twice|double|unauthorized|fail|error|decline|urgent|immediately)/.test(lower)) {
      return { category: Category.BILLING, priority: Priority.HIGH };
    }
    return { category: Category.BILLING, priority: Priority.MEDIUM };
  }

  // 2. BUG
  // Keywords: crash, error, fail, bug, broken, glitch, not working, down, 404, 500
  if (/(crash|error|fail|bug|broken|glitch|not working|down|issue|problem|404|500|exception|timeout|login|password|access|typo|distorted)/.test(lower)) {
    // High Priority Bugs: System down, crashes, security, data loss, login issues
    if (/(crash|down|login|locked|security|data loss|urgent|immediately|critical|block|500)/.test(lower)) {
       return { category: Category.BUG, priority: Priority.HIGH };
    }
    return { category: Category.BUG, priority: Priority.MEDIUM };
  }

  // 3. FEATURE_REQUEST
  // Keywords: feature, add, support, integrate, suggestion, improve, request, would be nice
  if (/(feature|add|support|integrate|integration|suggestion|improve|request|would be nice|can you|enable|mode|dark mode|mobile view)/.test(lower)) {
    return { category: Category.FEATURE_REQUEST, priority: Priority.LOW };
  }

  // 4. GENERAL
  // Default for everything else (How-to, General feedback)
  return { category: Category.GENERAL, priority: Priority.LOW };
};

export const analyzeTicketWithGemini = async (message: string): Promise<{ category: Category; priority: Priority; confidence: number }> => {
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 600));

    // Use the keyword fallback logic
    const analysis = keywordFallback(message);

    // Generate a simulated confidence score
    // Rule-based matches are usually fairly confident, but we'll vary it slightly for the UI
    // If it hit a keyword, high confidence. If General/Low (default), lower confidence.
    
    let baseConfidence = 0.85;
    if (analysis.category === Category.GENERAL && analysis.priority === Priority.LOW) {
        baseConfidence = 0.4; // Low confidence for fallback bucket
    }

    // Add small random variation
    const confidence = Math.min(0.99, Math.max(0.1, baseConfidence + (Math.random() * 0.1 - 0.05)));

    return {
      category: analysis.category,
      priority: analysis.priority,
      confidence
    };
};